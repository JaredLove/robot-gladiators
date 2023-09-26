window.alert("Welcome to Robot Gladiators!");
let playerHealth = 100;
let playerAttack = 10;
let playerGold = 10


let enemyName = "Roborto";
let enemyHealth = 50;
let enemyAttack = 12;

let fight = function() {

  let playerName = window.prompt("What is your robot's name?");
    const promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.(Skipping Will Cost you 2 gold!)");
    if (promptFight === 'FIGHT' || 'fight') {
  
  
console.log(`Stats:${playerName} currently has ${playerHealth} health points left and ${playerGold} gold left and ${playerAttack} attack points!`)
  
  //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth -= playerAttack

  // Log a resulting message to the console so we know that it worked.
    console.log(`${playerName} attacked ${enemyName} for ${playerAttack}. ${enemyName} has ${enemyHealth} health points left.`)
  // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth -= enemyAttack
  // Log a resulting message to the console so we know that it worked.
  console.log(`${playerName} was attacked by ${enemyName} for ${enemyAttack}. ${playerName} has ${playerHealth} health points left.`)



  // check enemy's health
if (enemyHealth <= 0) {
    window.alert(enemyName + " has died!");
  }else if (playerHealth <= 0) {
    window.alert(playerName + "has died");
  } 
  else {
    window.alert(enemyName + " still has " + enemyHealth + " health left.");
  }  
}else if (promptFight === "skip" || promptFight === "SKIP") {
    window.alert(playerName + " has chosen to skip the fight!");
    playerGold -= 2;
    fight();
  }else {
    window.alert("You need to choose a valid option. Try again!");
  }
};


fight();
