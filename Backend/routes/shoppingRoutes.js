const express = require("express");

const {
    getLists,
    makeList,
    deleteList,
    addItemToList,
    removeItemFromList
} = require("../functions/ShoppingFunctions");

const router = express.Router();

router.get("/:uid", getLists);
router.post("/make", makeList);
router.delete("/deletelist", deleteList),
router.post("/add", addItemToList);
router.delete("/deleteitem", removeItemFromList);

module.exports = router;