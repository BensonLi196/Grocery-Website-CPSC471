const express = require("express");

const {
    removeItem,
    addGroceryItem
} = require("../functions/ManageFunctions");

const router = express.Router();

router.delete("/removeItem", removeItem);
router.post("/addGrocery", addGroceryItem);

module.exports = router;