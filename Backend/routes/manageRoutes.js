const express = require("express");

const {
    removeItem,
    updateItem,
    addGroceryItem,
    addHouseholdItem,
    addPharmacyItem
} = require("../functions/ManageFunctions");

const router = express.Router();

router.delete("/removeItem", removeItem);
router.patch("/update", updateItem);
router.post("/addGrocery", addGroceryItem);
router.post("/addHousehold", addHouseholdItem);
router.post("/addPharmacy", addPharmacyItem);

module.exports = router;