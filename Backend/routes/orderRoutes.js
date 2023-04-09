const express = require("express");

const {
    makeOrder,
    getAllOrders
} = require("../functions/OrderFunctions");

const router = express.Router();

router.post("/", makeOrder);
router.get("/", getAllOrders);

module.exports = router;