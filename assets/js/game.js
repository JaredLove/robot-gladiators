var player = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerGold = 50;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;



// function to generate a random numeric value
// If we want a random number between 40 and 60, we would call the function as randomNumber(40, 60). That means min would be 40 and max would be 60. 
const randomNumber = (min, max) => {
    // Math.random() * 60 will give us a random decimal number between 0 and 20.xx.
    // Math.floor() will round this number down, so now the range is a whole number between 0 and 20.
    // We'll always add 40 to the generated number. If the random number is 0, we at least have 40. If the random number is 20, we have our upper limit: 60.
    let value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
  };


const startGame = () => {


    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

for(let i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        // The parentheses allow the arithmetic operation to perform and then concatenate this sum to the string message. 
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert(`Welcome to Robot Gladiators! Round ${(i + 1)} `);
            // pick new enemy to fight based on the index of the enemyNames array
        let pickedEnemyName = enemyNames[i];
            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);
        
        // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);

       // if player is still alive and we're not at the last enemy in the array
       if (playerHealth > 0 && i < enemyNames.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
      
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
      }  else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }

  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
}

// fight function where the player robot and ai robots fight
const fight = (enemyName) => {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
          // confirm player wants to skip
          var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
          // if yes (true), leave fight
          if (confirmSkip) {
            window.alert(player + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerMoney for skipping
            playerMoney = Math.max(0, playerMoney - 10);
            console.log("playerMoney", playerMoney)
            break;
          }
        }

        // playerDamage calls the randomNumber function with a min and a max attack and returns an attack value
        let playerDamage = randomNumber(playerAttack -3, playerAttack)
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        // so the enemyHealth does not go into the negatives for more professional look
        
        enemyHealth = Math.max(0, enemyHealth - playerDamage);
        console.log(
          player + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
        );
    
        // check enemy's health
        if (enemyHealth <= 0) {
          window.alert(enemyName + ' has died!');
    
          // award player money for winning
          playerMoney = playerMoney + 20;
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }
        
        let enemyDamage = randomNumber(enemyAttack -3, enemyAttack)
        // remove players's health by subtracting the amount set in the enemyAttack variable
        playerHealth = Math.max(0, playerHealth - enemyDamage);
        console.log(
          enemyName + ' attacked ' + player + '. ' + player + ' now has ' + playerHealth + ' health remaining.'
        );
    
        // check player's health
        if (playerHealth <= 0) {
          window.alert(player + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(player + ' still has ' + playerHealth + ' health left.');
        }
      } // end of while loop
};

const shop = () => {
     // ask player what they'd like to do
        const shopOptionPrompt = window.prompt(
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );

   // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
        if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
        
            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      break;
      case "UPGRADE":
      case "upgrade":
        if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
        
           // increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
          }
          else {
            window.alert("You don't have enough money!");
          }
      break;
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
  
      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
  
      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
}

const endGame = () => {
        // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }

            // ask player if they'd like to play again
        let playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
        // restart the game
        startGame();
        } 
        else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
  };

// start the game when the page loads
startGame();