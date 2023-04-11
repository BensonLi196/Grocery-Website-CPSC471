const mysql = require('mysql');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sunny3489$",
  database: "GROCERY_STORE"
});

dbConnection.connect((err) => {
  if(err) throw err;
});

const userLogin = async(req, res) => {
  try{ 
    const {email, Upassword} = req.body; 
    var userID; 
    const queryMngr = `SELECT * FROM THE_USER WHERE email = '${email}' AND userID IN(SELECT mgrID FROM MANAGER)`;
    const queryUser = `SELECT * FROM THE_USER WHERE email = '${email}' `;
    dbConnection.query(queryMngr, async (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        const passValid = await bcrypt.compare(Upassword, results[0].Upassword);
        if(passValid) {
          userID = results[0].userID;
          const response = {
            manager: true,
            ID: userID
          };
          res.status(200).json(response);
        } else {
          res.status(401).send('Password is wrong');
        }
      } else {
        dbConnection.query(queryUser, async (error, results, fields) => {
            if (error) throw error;
            if(results.length > 0) {
              const passValid = await bcrypt.compare(Upassword, results[0].Upassword);
              if(passValid) {
                userID = results[0].userID;
                const response = {
                  manager: false,
                  ID: userID
                };
                return res.status(200).json(response);
              } else {
                return res.status(401).send("Password is wrong");
              }                
            } else {
                res.status(404).send('User does not exist');
            }            
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error');
    }
  } 

const userRegister = async(req, res) => {
  const { FName, lName, email, Upassword } = req.body;
  const randomKey = crypto.randomBytes(10).toString('hex');
  userKey = randomKey;
  let emailUsed = true;
  let userIDUsed = true;
  const queryChecking = new Promise((resolve, reject) => {
    dbConnection.query(`SELECT email FROM THE_USER WHERE email = '${email}'`, (error, results, fields) => {
      if (error) reject(error);
      if (results.length > 0) {
        res.status(409).send('Email already in use');
      } else {
        emailUsed = false;
      }
    });

    function freeUserID() {
      dbConnection.query(`SELECT userID FROM THE_USER WHERE userID = '${userKey}'`, (error, results, fields) => {
        if (error) reject(error);
        if (results.length > 0) {
          console.log(userKey);
          // Increment userKey and rerun queryUserID to check the next available userID
          userKey = crypto.randomBytes(10).toString('hex');
          freeUserID();
        } else {
          userIDUsed = false;
          resolve();
        }
      });
    };

    freeUserID();
  });

  bcrypt.hash(Upassword, 8, function(err, hash) {
    queryChecking.then(() => {
      if(emailUsed==false && userIDUsed==false) {
        // Both email and userID are available, insert the new user into the database
        const insertQuery = `INSERT INTO THE_USER (userID, Fname, Lname, email, Upassword) VALUES ('${userKey}', 
                                                                                                   '${FName}', 
                                                                                                   '${lName}', 
                                                                                                   '${email}', 
                                                                                                   '${hash}')`;
        dbConnection.query(insertQuery, (error, result, fields) => {
          if(error) res.status(500).send('DB error');
          console.log('User added successfully');
          const tstQuery = `INSERT INTO CUSTOMER (ctmrID) SELECT userID FROM THE_USER WHERE userID = '${userKey}'`;
          dbConnection.query(tstQuery, (error, results, field) => {
            if(error) res.status(500).send('DB error');
          });
          res.status(201).send('User successfully created');
        });
      } else {
        console.log('could not register the account');
        res.status(401).send('User successfully created');
      }
    }).catch((err) => {
      console.error(err);
      if(error) res.status(500).send('DB error');
    });
  });
}

module.exports = {
  userLogin,
  userRegister
};