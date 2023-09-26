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


  // reset player stats
  playerInfo.reset();
for(let i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
        // The parentheses allow the arithmetic operation to perform and then concatenate this sum to the string message. 
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert(`Welcome to Robot Gladiators! Round ${(i + 1)} `);
            // pick new enemy to fight based on the index of the enemyNames array
        let pickedEnemyObj =  enemyInfo[i];
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
        
        // pass the pickedEnemyObj value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

       // if player is still alive and we're not at the last enemy in the array
       if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
const fight = (enemy) => {
    while (playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
          // confirm player wants to skip
          var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
          // if yes (true), leave fight
          if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money)
            break;
          }
        }

        // playerDamage calls the randomNumber function with a min and a max attack and returns an attack value
        let playerDamage = randomNumber(playerInfo.attack -3, playerInfo.attack)
        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        // so the enemy.health does not go into the negatives for more professional look
        
        enemy.health = Math.max(0, enemy.health - playerDamage);
        console.log(
          playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
        );
    
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + ' has died!');
    
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }
        
        let enemyDamage = randomNumber(enemy.attack -3, enemy.attack)
        // remove players's health by subtracting the amount set in the enemy.attack variable
        playerInfo.health = Math.max(0, playerInfo.health - enemyDamage);
        console.log(
          enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );
    
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
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
        playerInfo.refillHealth();
        break;
        case "UPGRADE":
        case "upgrade":
        playerInfo.upgradeAttack();
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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


  const playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
      },
      upgradeAttack: function() {
        if (this.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
          this.attack += 6;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
      }
  };

  const enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14),
    //   shield: {
    //     type: "wood",
    //     strength: 10
    //   }
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
  ];

// start the game when the page loads
startGame();