




function cstmrAction(manDecision, dbConnection) {
    // customer should be able to browse between all items
    console.log(`here are all the items the store sells: `);
    dbConnection.query(`SELECT itemName FROM ITEMS`, function(error, result, fields) {
        if (error) throw error;
        console.log(result);
        // ask them to type the name of the thing they want to see
        manDecision.question(`type the name of the item you want to select: `, async (theItem) => {
        // search for it in the list and if it exists get the itemID
        console.log(theItem);
        if (theItem === 'return') {
            // mngrChoice(manDecision, dbConnection);
        } else {
            dbConnection.query(`SELECT itemID FROM ITEMS WHERE itemName = '${theItem}'`, function(err, results, field) {
            if (err) throw err;
            if (results.length > 0) {
                // addToShoppingList(results, manDecision, dbConnection);
                console.log(`back`);
            } else {
                console.log(`item does not exist or you misspelled the name.`);
                manDecision.once('line', cycleForItems);
                cycleForItems();
            }
            });
        }         
        // changeItem(theItem);

        });
    
  });
    // will have a how do you want to browse once i apply it to frontend stuff
    // this will be done tomorrow most likely

    // select items to place in cart

    // possibly discounts


}


function theCustomer(dbConnection) {
    console.log("hello customer");
  // let userChoice = '';
  const readline2 = require('readline');
  
  const manDecision = readline2.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
  userActions(manDecision, dbConnection);
}

module.exports = {
    // homeFunction: homeFunction,
    changeItem: changeItem,
    pickItem: pickItem,
    cstmrAction: cstmrAction,
    theCustomer: theCustomer
  };