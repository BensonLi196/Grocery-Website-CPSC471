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

async function addItem(itemName, price, aisle, amount, supplier) {
    return new Promise((resolve, reject) => {
        const addItemSQL = `INSERT INTO ITEMS (itemName, price, aisle, amount, supplier) 
                            VALUES ('${itemName}', ${price}, '${aisle}', ${amount}, '${supplier}')`;
        dbConnection.query(addItemSQL, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
}

const removeItem = async(req, res) => {
    const {itemID} = req.body;
    const removeSQL = `DELETE FROM ITEMS WHERE itemID = ${itemID}`;
    dbConnection.query(removeSQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw error;
        }
        res.status(200).send('Successfully deleted item');
    });
}

const addGroceryItem = async(req, res) => {
    const {itemName, price, aisle, amount, supplier, expiryDate, allergies, category, special} = req.body;
    var itemID = await addItem(itemName, price, aisle, amount, supplier);
    const addGrocerySQL = `INSERT INTO GROCERY (itemID, expiryDate, allergies, category, special) 
                           VALUES (${itemID}, '${expiryDate}', '${allergies}', '${category}', '${special}')`;
    dbConnection.query(addGrocerySQL, (error, result) => {
        if(error) {
            res.status(500).send('DB error');
            throw error;
        }
        res.status(200).send('Successfully added item');
    });
}


module.exports = {
    removeItem,
    addGroceryItem
};