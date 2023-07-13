/* 
🌟 APP: Fighting Game

*/

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('simulate');
let winnerDiv = document.getElementById('winnerDiv');
let p1Name = document.getElementById('player1-name');
let p2Name = document.getElementById('player2-name');
let p1Health = document.getElementById('player1-health');
let p2Health = document.getElementById('player2-health');
let resetBtn=document.getElementById('resetBtn');

const updateGame = (p1,p2,gameState) => {
  // Update the DOM with the names and the latest health of players

        p1Name.innerText=p1.name;
        p2Name.innerText=p2.name;
        p1Health.innerText=p1.health;
        p2Health.innerText=p2.health;
                // Condition IF either player health is <= 0 then set isOver to true and declareWinner
                if(p1.health <=0 || p2.health<=0){
                    game.isOver=true;
                    gameState=game.isOver;
                    winnerDiv.innerText=game.declareWinner(gameState,p1,p2);
                }
}

// ** Create the Player class which can create a player with all it's attributes and methods **
class Player {
  constructor(name, attackDamage) {
    this.name = name;
    this.health = 100;
    this.attackDmg = attackDamage;
  }
  
  strike (player, enemy, attackDmg) {

  
            const damageAmount=Math.floor((Math.random()*attackDmg)+1);
                enemy.health-=damageAmount;
    //  Update the game and DOM with updateGame()
                updateGame(p1,p2,game.isOver);
    //  Return a message of 'player name attacks enemy name for damageAmount'
            return `${player.name} hits ${enemy.name} with ${damageAmount} damage`;
  }
  
  heal (player) {

    // Get random number between 1 - 5 and store that in hpAmount(Healing ability will be less)
            const heal=Math.floor(Math.random()*5+1);
    // Add hpAmount to players health
                if(player.health+heal<=100){
                    player.health+=heal;
                }
    //  Update the game and DOM with updateGame()
                        updateGame(p1,p2,game.isOver);
    //  Return a message of 'player name heals for hpAmount HP'
     return (`${player.name} heals with ${player.health} amount`);
  }
}

///////////Game Class


class Game {
  constructor() {
    this.isOver = false;
  }

  
  declareWinner(isOver,p1, p2) {
    
    
            let message;
    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
                if(this.isOver && p1.health<=0){
                    message=`${p2.name} WINS!`;
                }else if(this.isOver && p2.health<=0){
                    message=`${p1.name} WINS!`;
                }
                    document.getElementById("victory").play();
                
                    return message;
    
    
  }

  ///reset functionality
  reset(p1,p2) {
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
            p1.health=100;
            p2.health=100;
            this.isOver=false;
            winnerDiv.innerText="";
            p1Health.innerText=p1.health;
            p2Health.innerText=100;
            updateGame(p1,p2,this.isOver);
  }
  
  // ** whole match simulation **
  play(p1, p2) {
    // Reset- so that it start from beginning
        this.reset(p1,p2);
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      //Make sure both players get strike() and heal() once each loop
    p1.strike(p1,p2,p1.attackDmg);
    p2.strike(p2,p1,p2.attackDmg);
    p1.heal(p1);
    p2.heal(p2);   
    updateGame(p1,p2,this.isOver);
    }
    // Once isOver is TRUE run the declareWinner() method 
    return this.declareWinner(isOver,p1,p2);
  }

}
//reset functionality
resetBtn.onclick=()=>game.reset(p1,p2);

// ** Create 2 players using the player class **
let p1=new Player(prompt("Enter your name"),10);
let p2=new Player(prompt("Enter your name"),10);

// ** Create the game object from the Game class **
let game=new Game();

// ** Intialize the game by calling updateGame() **
updateGame(p1,p2,game.isOver);


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
playButton.onclick=()=>game.play(p1,p2);

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
            if(e.key=='q' && p2.health>0 && game.isOver==false){
                p1.strike(p1,p2,p1.attackDmg);
                document.getElementById('p1attack').play();
            }
    // After striking then play attack sound
                   
});

document.addEventListener('keydown', function(e) {
  
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if(e.key=='a' && p2.health>0 && game.isOver==false){
    p1.heal(p1);
    document.getElementById("p1heal").play();
}
    // After healing then play heal sound
   

});


// ** Player 2 Controls **



document.addEventListener('keydown', function(e) {
  
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if(e.key=='p' && p1.health>0 && game.isOver==false){
    p2.strike(p2,p1,p2.attackDmg);
    document.getElementById("p2attack").play();
}
    // After striking then play attack sound
                   
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if(e.key == 'l' && p2.health>0 && game.isOver==false){
    p2.heal(p2);
    document.getElementById("p2heal").play();


}
    // After healing then play heal sound
  
});