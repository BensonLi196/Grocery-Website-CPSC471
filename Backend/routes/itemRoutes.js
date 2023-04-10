const express = require("express");

const {
    getGroceryItems
} = require("../functions/ItemFunctions");

const router = express.Router();

router.get("/grocery", getGroceryItems);

module.exports = router;