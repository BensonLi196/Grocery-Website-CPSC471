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

    const getListSQL = `SELECT sl.listName, GROUP_CONCAT(i.itemName, ',', i.price, ',', i.discount SEPARATOR ';') AS itemList
                        FROM SHOP_LIST sl
                        LEFT JOIN ADDS a ON sl.listID = a.listID
                        LEFT JOIN ITEMS i ON a.itemID = i.itemID
                        WHERE sl.ctmrID = '${userID}'
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

    const makeListSQL = `INSERT INTO SHOP_LIST (listName, ctmrID) VALUES ('${listName}','${userID}')`;
    dbConnection.query(makeListSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(200).send('Sucessfully created list');
    });
}

const deleteList = async(req, res) => { 
     
    const {listID, userID} = req.body;

    const deleteItemSQL = `DELETE FROM SHOP_LIST WHERE listID = '${listID}' AND ctmrID = '${userID}'`;
    dbConnection.query(deleteItemSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(200).send('Sucessfully deleted list');
    });
}

const addItemToList = async(req, res) => {

    const {listID, itemID, amount} = req.body;
    const findItemSQL = `SELECT * FROM ADDS WHERE listID = ${listID} AND itemID = ${itemID};`;
    dbConnection.query(findItemSQL, async (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        if(result.length > 0) {
            res.status(400).send('Item is already in shopping list');
        } else {
            const addItemSQL = `INSERT INTO ADDS (listiD, itemID, amount) VALUES (${listID}, ${itemID}, ${amount})`;
            dbConnection.query(addItemSQL, async (error, result) => {
                if(error) {
                    res.status(500).send('DB error');
                    throw(error);
                }
                res.status(200).send('Sucessfully added item');
            });
        }
    });
}

const removeItemFromList = async(req, res) => {

    const {listID, itemID} = req.body;
    const deleteItemSQL = `DELETE FROM ADDS WHERE listID = ${listID} AND itemID = ${itemID}`;
    dbConnection.query(deleteItemSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw(error);
        }
        res.status(200).send('Sucessfully deleted item');
    });
}

module.exports = {
    getLists,
    makeList,
    deleteList,
    addItemToList,
    removeItemFromList
}