const { rejects } = require('assert');
const { error } = require('console');
const mysql = require('mysql');
const { resolve } = require('path');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sunny3489$",
  database: "GROCERY_STORE"
});

function userLogin() {

  const readline = require('readline');

  const response = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let userEmail = '';
  let userPassword = '';

  response.question('enter your email: ', (email) => {
    console.log('email entered: ', email);
    userEmail = email;
    response.question('enter your password: ', (password) => {
      console.log('password entered: ', password);
      userPassword = password;
      response.close();
      // another way to get check the query in the database is with this checkDatabase function
      // checkDatabase();
    });
  });

  response.on('close', () => {
    let isManager = false;
    console.log();
    const queryMngr = `SELECT Upassword FROM THE_USER WHERE email = '${userEmail}' AND userID IN(SELECT mgrID FROM MANAGER)`;
    const queryUser = `SELECT Upassword FROM THE_USER WHERE email = '${userEmail}' `;
    dbConnection.connect((err) => {
      if(err) throw err;
      dbConnection.query(queryMngr, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
          const passValid = bcrypt.compare(userPassword, JSON.stringify(results));
          if(passValid) {
            console.log('User is a manager');
            isManager = true;
            console.log(isManager);
            dbConnection.end();
          }
        } else {
          console.log('User is not a manager');
          dbConnection.query(queryUser, (error, results, fields) => {
              if (error) throw error;
              if(results.length > 0) {
                console.log(userPassword);
                console.log(results);
                const passValid = bcrypt.compare(userPassword, JSON.stringify(results));
                if(passValid) {
                  console.log('This account exists');
                  dbConnection.end();
                }                
              } else {
                  console.log('This account does not exists in our database');
                  dbConnection.end();
                }
            });
          }
        });
      });
    });  
  
  // -------which is defined down here-------
  
  // function checkDatabase() {
  //   const query = `SELECT userID FROM THE_USER WHERE email = '${userEmail}' AND Upassword = '${userPassword}'`;
  //   dbConnection.query(query, (error, results, fields) => {
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     if (results.length > 0) {
  //       console.log('Response exists in database!');
  //     } else {
  //       console.log('Response does not exist in database.');
  //     }
  //     dbConnection.end();
  //   });
  // }
  
}

function userRegister() {

  const readline = require('readline');

  const response = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let firstname = '';
  let lastName = '';
  let userEmail = '';
  let userPassword = '';
  let userKey = '';

  const askQuestion = (question) => {
    return new Promise((resolve) => {
      response.question(question, (answer) => {
        console.log('Answer:', answer);
        resolve(answer);
      });
    });
  };
  
  (async () => {
    firstname = await askQuestion('Please enter your first name: ');
    lastName = await askQuestion('Please enter your last name: ');
    userEmail = await askQuestion('Please enter the email youd like to use: ');
    userPassword = await askQuestion('Please enter your password: ');
  
    // Perform some action with the inputs here
    console.log('Firstname:', firstname);
    console.log('Lastname:', lastName);
    console.log('Email:', userEmail);
    console.log('Password:', userPassword);
  
    response.close();
  })();
  
  response.on('close', () => {
    const randomKey = crypto.randomBytes(10).toString('hex');
    userKey = randomKey;
    userKey = 'yotK3qgm0Q2aJl7bEjKZ';
    console.log("enters");
    let emailUsed = true;
    let userIDUsed = true;
    // const queryEmail = `SELECT email FROM THE_USER WHERE email = '${userEmail}'`;
    // const queryUserID = `SELECT userID FROM THE_USER WHERE userID = '${userKey}'`;
    const queryChecking = new Promise((resolve, reject) => {
      dbConnection.connect((err) => {
        if(err) reject(err);
        dbConnection.query(`SELECT email FROM THE_USER WHERE email = '${userEmail}'`, (error, results, fields) => {
          if (error) reject(error);
          if (results.length > 0) {
            console.log('Email in use');
            // dbConnection.end();
          } else {
            console.log('Email not in use');
            emailUsed = false;
          }
        });

        function freeUserID() {
          dbConnection.query(`SELECT userID FROM THE_USER WHERE userID = '${userKey}'`, (error, results, fields) => {
            if (error) reject(error);
            if (results.length > 0) {
              console.log(userKey);
              console.log('UserID in use');
              // Increment userKey and rerun queryUserID to check the next available userID
              userKey = crypto.randomBytes(10).toString('hex');
              freeUserID();
            } else {
              console.log(userKey);
              console.log('UserID not in use');
              // dbConnection.end();
              userIDUsed = false;
              resolve();
            }
          });
        }

        freeUserID();
      });
    });
    bcrypt.hash(userPassword, 8, function(err, hash) {
      queryChecking.then(() => {
        if(emailUsed==false && userIDUsed==false) {
          // Both email and userID are available, insert the new user into the database
          const insertQuery = `INSERT INTO THE_USER (userID, Fname, Lname, email, Upassword) VALUES ('${userKey}', '${firstname}', '${lastName}', '${userEmail}', '${hash}')`;
          dbConnection.query(insertQuery, (error, result, fields) => {
            if (error) throw error;
            console.log('User added successfully');
            dbConnection.end();
            testingChanges();
          });
        } else {
          console.log('could not register the account');
          dbConnection.end();
          testingChanges();
        }
      }).catch((err) => {
        console.error(err);
        dbConnection.end();
        // testingChanges();
      });
    });
      // testingChanges();
    });
}

// --------------- here to test changes made to database --------------------

const testConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sunny3489$",
  database: "GROCERY_STORE"
});

function testingChanges() {
  console.log();
  testConnection.connect(function(err) {
    if (err) throw err;
    testConnection.query("SELECT * FROM ITEMS", function (err, result, fields) {
      if (err) throw err;
      console.log("ITEMS BEFORE:");
      console.log(result);
    });
    // testConnection.query("INSERT INTO ITEMS (itemID, itemName, price, aisle, amount) VALUES (4, 'orange', 5, '5', 10)",
    //           function (err,result,fields) {
    //   if(err) throw err;
    //   console.log("inserted!");
    // });
    // testConnection.query("SELECT * FROM ITEMS", function (err, result, fields) {
    //   if (err) throw err;
    // console.log("ITEMS AFTER:");
    //   console.log(result);
    // });
    testConnection.query("SELECT * FROM THE_USER", function (err, result, fields) {
      if (err) throw err;
      console.log("\nTHE_USER::");
      console.log(result);
    });
    
    testConnection.query("SELECT * FROM STORE", function (err, result, fields) {
      if (err) throw err;
      console.log("\nSTORE:");
      console.log(result);
    });

    testConnection.query("SELECT * FROM MANAGER", function (err, result, fields) {
      if (err) throw err;
      console.log("\nMANAGER:");
      console.log(result);
    });

    // ENTER HERE THE INFORMATION FOR MANAGER TO SEE IF ITLL GIVE US THE GROCERY
    testConnection.end();
  });
}

module.exports = {
  // homeFunction: homeFunction,
  userLogin: userLogin,
  userRegister: userRegister,
  testingChanges: testingChanges
};