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

const makeOrder = async(req, res) => {
    
    const {mgrID, supID, items} = req.body;
    console.log(items);
    console.log(typeof items[0]);
            
    // add to Orders
    const orderSQL = `INSERT INTO ORDERS (mgrID, supID) VALUES ('${mgrID}', '${supID}')`;
    dbConnection.query(orderSQL, (error, result) => {
        if(error) return res.status(500).send('DB error');

        var orderID;
        orderID = result.insertId;
        
        // add list of items to order 
        for (var i = 0; i < items.length; i++) {
            const orderItemSQL = `INSERT INTO ORDER_ITEMS (orderID, itemID) VALUES (${orderID}, ${items[i]})`;
            dbConnection.query(orderItemSQL, (error, result) => {
                if(error) return res.status(500).send('DB error');
            });
        }
        res.status(200).send('Successfully added order');
    });  
}

const getAllOrders = async(req, res) => {

    var orderInfo;

    return new Promise((resolve, reject) => {

        const getOrdersSQL = `
            SELECT ORDERS.*, SUPPLIER.supName, GROUP_CONCAT(ITEMS.itemName) AS itemNames
            FROM ORDERS
            LEFT JOIN SUPPLIER ON ORDERS.supID = SUPPLIER.supID
            LEFT JOIN ORDER_ITEMS ON ORDERS.orderID = ORDER_ITEMS.orderID
            LEFT JOIN ITEMS ON ORDER_ITEMS.itemID = ITEMS.itemID
            GROUP BY ORDERS.orderID;`;

        dbConnection.query(getOrdersSQL, (error, result) => {
            if(error) res.status(500).send("DB error");
            orderInfo = JSON.stringify(result);
            resolve(orderInfo);
            res.status(200).send(orderInfo);
        });
    });
}

module.exports = {
    makeOrder,
    getAllOrders
};