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

const getGroceryItems = async(req, res) => {
    
    const getItemSQL = `SELECT i.itemID, i.itemName, i.price, i.discount, i.aisle, i.amount, i.supplier, i.store, g.expiryDate, g.allergies, g.category, g.special
                        FROM ITEMS i
                        LEFT JOIN GROCERY g ON i.itemID = g.itemID;`;
    dbConnection.query(getItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send(JSON.stringify(result));
    });

}

module.exports = {
    getGroceryItems
};