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
                resolve(-1);
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
            return res.status(500).send('DB error');
        }
        res.status(200).send('Successfully deleted item');
    });
}

const updateItem = async(req, res) => {
    const {itemID, itemName, price, discount, aisle, amount, supplier} = req.body;
    const updateSQL = `UPDATE ITEMS SET itemName = '${itemName}', price = ${price}, 
                                                    discount = ${discount}, aisle = '${aisle}', 
                                                    amount = ${amount}, supplier = ${supplier} WHERE itemID = ${itemID}`;
    dbConnection.query(updateSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send('Successfully updated item');
    });
}

const addGroceryItem = async(req, res) => {
    const {itemName, price, aisle, amount, supplier, expiryDate, allergies, category, special} = req.body;
    var itemID = await addItem(itemName, price, aisle, amount, supplier);
    if(itemID == -1) return res.status(500).send('DB error');
    const addItemSQL = `INSERT INTO GROCERY (itemID, expiryDate, allergies, category, special) 
                        VALUES (${itemID}, '${expiryDate}', '${allergies}', '${category}', '${special}')`;
    dbConnection.query(addItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send('Successfully added item');
    });
}

const addHouseholdItem = async(req, res) => {
    const {itemName, price, aisle, amount, supplier, category} = req.body;
    var itemID = await addItem(itemName, price, aisle, amount, supplier);
    if(itemID == -1) return res.status(500).send('DB error');
    const addItemSQL = `INSERT INTO HOUSEHOLD (itemID, category) 
                        VALUES (${itemID}, '${category}')`;
    dbConnection.query(addItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send('Successfully added item');
    });
}

const addPharmacyItem = async(req, res) => {
    const {itemName, price, aisle, amount, supplier, genName, brandName} = req.body;
    var itemID = await addItem(itemName, price, aisle, amount, supplier);
    if(itemID == -1) return res.status(500).send('DB error');
    const addItemSQL = `INSERT INTO PHARMACY (itemID, genName, brandName) 
                        VALUES (${itemID}, '${genName}', '${brandName}')`;
    dbConnection.query(addItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send('Successfully added item');
    });
}

module.exports = {
    removeItem,
    updateItem,
    addGroceryItem,
    addHouseholdItem,
    addPharmacyItem
};