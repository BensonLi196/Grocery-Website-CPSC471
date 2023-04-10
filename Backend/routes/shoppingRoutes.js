const express = require("express");

const {
    getLists,
    makeList,
    addItemToList
} = require("../functions/ShoppingFunctions");

const router = express.Router();

router.get("/:uid", getLists);
router.post("/make", makeList);
router.post("/add", addItemToList);

module.exports = router;