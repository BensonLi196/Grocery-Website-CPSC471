const path = require('path');
const homePagePath = path.join(__dirname, 'backend', 'HomePage');
const homePage = require(homePagePath);

function firstChoice() {
  const readline2 = require('readline');
  
  const logOrReg = readline2.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function loginOrRegister () {
    logOrReg.question("Do you want to login or register? ", async (resp) => {
      try {
        let userResp = resp.trim().toLowerCase();
        if (userResp === 'login') {
          logOrReg.close();
          await homePage.userLogin();
        } else if (userResp === 'register') {
          logOrReg.close();
          await homePage.userRegister();
        } else {
          console.log("Invalid choice, please type 'login' or 'register'");
          logOrReg.once('line', loginOrRegister)
          loginOrRegister();
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  loginOrRegister();
}

firstChoice();

// homePage.userLogin();
// homePage.testingChanges();
