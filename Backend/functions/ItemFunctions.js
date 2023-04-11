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
                        JOIN GROCERY g ON i.itemID = g.itemID;`;
    dbConnection.query(getItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send(JSON.stringify(result));
    });
}

const getHouseholdItems = async(req, res) => {
    
    const getItemSQL = `SELECT i.itemID, i.itemName, i.price, i.discount, i.aisle, i.amount, i.supplier, i.store, h.category
                        FROM ITEMS i
                        JOIN HOUSEHOLD h ON i.itemID = h.itemID;`;
    dbConnection.query(getItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send(JSON.stringify(result));
    });
}

const getPharmacyItems = async(req, res) => {
    
    const getItemSQL = `SELECT i.itemID, i.itemName, i.price, i.discount, i.aisle, i.amount, i.supplier, i.store, p.genName, p.brandName
                        FROM ITEMS i
                        JOIN PHARMACY p ON i.itemID = p.itemID;`;
    dbConnection.query(getItemSQL, (error, result) => {
        if(error) {
            return res.status(500).send('DB error');
        }
        res.status(200).send(JSON.stringify(result));
    });
}

const search = async(req, res) => {

    try {

        const search = req.query.q;

        const searchSQL = `SELECT i.itemID, i.itemName, i.price, i.discount, i.aisle, i.amount, i.supplier, i.store, g.expiryDate, g.allergies, COALESCE(g.category, h.category) AS category, g.special, p.genName, p.brandName
                        FROM ITEMS i
                        LEFT JOIN GROCERY g ON i.itemID = g.itemID
                        LEFT JOIN HOUSEHOLD h ON i.itemID = h.itemID
                        LEFT JOIN PHARMACY p ON i.itemID = p.itemID
                        WHERE i.itemName LIKE '${search}';`;
        
        dbConnection.query(searchSQL, (error, result) => {
            if(error) {
                return res.status(500).send('DB error');
            }
            res.status(200).send(JSON.stringify(result));
        });

    } catch (err) {
        if(err)
        console.error(err);
        res.status(500).send('error');
    }
}

module.exports = {
    getGroceryItems,
    getHouseholdItems,
    getPharmacyItems,
    search
};