const express = require("express");

const {
    getGroceryItems,
    getHouseholdItems,
    getPharmacyItems,
    search
} = require("../functions/ItemFunctions");

const router = express.Router();

router.get("/grocery", getGroceryItems);
router.get("/household", getHouseholdItems);
router.get("/pharmacy", getPharmacyItems);
router.get("/search", search);

module.exports = router;