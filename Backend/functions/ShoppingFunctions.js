const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sunny3489$",
    database: "GROCERY_STORE"
  });
  
dbConnection.connect((err) => {
    if(err) throw err;
});

const getLists = async(req, res) => {
    
    const userID = req.params.uid;

    const getListSQL = `SELECT sl.listName, GROUP_CONCAT(i.itemName, ',', i.price, ',', IFNULL(b.discount,0) SEPARATOR ';') AS itemList
                        FROM SHOP_LIST sl
                        JOIN ADDS a ON sl.listID = a.listID
                        JOIN ITEMS i ON a.itemID = i.itemID
                        LEFT JOIN BROWSES b ON b.itemID = i.itemID
                        WHERE sl.userID = '${userID}'
                        GROUP BY sl.listID;`;


    dbConnection.query(getListSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(200).send(JSON.stringify(result));
    });
}

const makeList = async(req, res) => {
    
    const {listName, userID} = req.body;

    const makeListSQL = `INSERT INTO SHOP_LIST (listName, userID) VALUES ('${listName}','${userID}')`;
    dbConnection.query(makeListSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(400).send('Sucessfully created list');
    });
}

const addItemToList = async(req, res) => {

    const {listID, itemID, amount} = req.body;
    const addItemSQL = `INSERT INTO ADDS (listiD, itemID, amount) VALUES (${listID}, ${itemID}, ${amount})`;
    dbConnection.query(addItemSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(400).send('Sucessfully added item');
    });
}

module.exports = {
    getLists,
    makeList,
    addItemToList
}