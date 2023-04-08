const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sunny3489$",
    database: "GROCERY_STORE"
  });

function lookAtItem() {

}
function changeItem(theItem) {

}
function editItem() {
    console.log(`here are all the items the store sells: `);
    dbConnection.connect((err) => {
        console.log(dbConnection.query(`SELECT itemName FROM ITEMS`));
        
    });
}
function createOrder() {

}
function theManager() {
    console.log("hello manager");
    const readline = require('readline');
    
    const manDecision = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    // let userChoice = '';

    function mngrChoice () {
        manDecision.question(`what do you want to do? (choose between 'edit items' or 'create order') `, async (choice) => {
            try {
                let userChoice = choice.trim().toLowerCase();
                if (userChoice === 'edit items') {
                    manDecision.close();
                  await editItem();
                } else if (userChoice === 'create order') {
                    manDecision.close();
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
    mngrChoice();
  }
  
  firstChoice();