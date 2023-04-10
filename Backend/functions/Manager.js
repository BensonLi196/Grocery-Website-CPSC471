
function changeItem(theItem, manDecision, dbConnection) {
  // let manChoice = theItem.trim().toLowerCase();
  dbConnection.query(`SELECT * FROM ITEMS WHERE itemID = '${theItem}'`,(err, result, field) => {
    if (err) throw err;
    // console.log(`here is the information for `, result);
    let itmName = result[0].itemName;
    let itmPrice = result[0].price;
    let itmAisle = result[0].aisle;
    let itmAmount = result[0].amount;
    console.log(itmName, " ", itmPrice, " ", itmAisle, " ", itmAmount);
    manDecision.question(`would you like to change its price, aisle, amount? say return to go back `, async (mgrChange) => {
      try {
        if (mgrChange === 'price') {
          manDecision.question(`what would you like to change it to? `, async (priceChng) => {
            dbConnection.query(`UPDATE ITEMS SET price = '${priceChng}'`, (err, result) => {
              if (err) throw err;
              console.log(`updated`);
              // return;
              manDecision.once('line', changeItem);
              changeItem(theItem, manDecision, dbConnection);
            });
          });
        } else if (mgrChange === 'aisle') {
          manDecision.question(`what would you like to change it to? `, async (amntChng) => {
            dbConnection.query(`UPDATE ITEMS SET aisle = '${amntChng}'`, (err, result) => {
              if (err) throw err;
              console.log(`updated`);
              // return;
              manDecision.once('line', changeItem);
              changeItem(theItem, manDecision, dbConnection);
            });
          });
        } else if(mgrChange === 'amount') {
          manDecision.question(`what would you like to change it to? `, async (amntChng) => {
            dbConnection.query(`UPDATE ITEMS SET amount = '${amntChng}'`, (err, result) => {
              if (err) throw err;
              console.log(`updated`);
              // return;
              manDecision.once('line', changeItem);
              changeItem(theItem, manDecision, dbConnection);
            });
          });
        } else if (mgrChange === 'return') {
          pickItem(manDecision, dbConnection);
        } else {
          console.log("Invalid choice, please try again ");
          manDecision.once('line', changeItem);
          changeItem(theItem, manDecision, dbConnection);
        }
      } catch (error) {
        console.error(error);
      }

    });
  });
}
function pickItem(manDecision, dbConnection) {

  console.log(`here are all the items the store sells: `);
  dbConnection.query(`SELECT itemName FROM ITEMS`, function(error, result, fields) {
    if (error) throw error;
    console.log(result);
    // ask them to type the name of the thing they want to see
    manDecision.question(`type the name of the item you want to edit: or say return to go back `, async (theItem) => {
      // search for it in the list and if it exists get the itemID
      console.log(theItem);
      if (theItem === 'return') {
        mngrChoice(manDecision, dbConnection);
      } else {
          dbConnection.query(`SELECT itemID FROM ITEMS WHERE itemName = '${theItem}'`, function(err, results, field) {
          if (err) throw err;
          if (results.length > 0) {
            changeItem(results, manDecision, dbConnection);
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
  // ask them to type the name of the thing they want to see
  // allow them to make motifications
  // dont allow to change id, name.
}
// function createOrder() {

// }
function mngrChoice(manDecision, dbConnection) {
  manDecision.question(`what do you want to do? (choose between 'edit items' or 'create order') `, async (choice) => {
    try {
      let userChoice = choice.trim().toLowerCase();
      userChoice = 'edit items';
      if (userChoice === 'edit items') {
        // manDecision.close();
        await pickItem(manDecision, dbConnection);
      } else if (userChoice === 'create order') {
        // manDecision.close();
        await createOrder();
      } else {
        console.log("Invalid choice, please type 'login' or 'register'");
        manDecision.once('line', mngrChoice)
        mngrChoice();
      }
    } catch (error) {
      console.error(error);
    }
  });
}
function theManager(dbConnection) {
  console.log("hello manager");
  // let userChoice = '';
  const readline2 = require('readline');
  
  const manDecision = readline2.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  mngrChoice(manDecision, dbConnection);
}
  

module.exports = {
  // homeFunction: homeFunction,
  changeItem: changeItem,
  pickItem: pickItem,
  mngrChoice: mngrChoice,
  theManager: theManager
};