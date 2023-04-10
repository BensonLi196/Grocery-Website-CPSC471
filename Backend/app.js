const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const userRoutes = require("./routes/userRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const shoppingRoutes = require("./routes/shoppingRoutes.js");
const manageRoutes = require("./routes/manageRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/shopping", shoppingRoutes);
app.use("/api/manage", manageRoutes);

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sunny3489$",
    database: "grocery_store"
});

module.exports = connection;

const server = app.listen(5000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
});