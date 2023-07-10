'use strict';


//selectin elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//buttons
const diceEl = document.querySelector('.dice');
const btnRoll =document.querySelector('.btn--roll') ;
const btnNew =document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,isPlaying;

const init = function(){
//starting condition


  scores =[0,0];
  currentScore = 0; 
  activePlayer = 0;
  isPlaying =true;

//state vairable
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent =0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  
};

init();

//switching player function
const playerSwitch = function(){
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1: 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active'); 
};

//Roll dice button function
btnRoll.addEventListener('click',function(){

  if(isPlaying){
  //generate a random dice number
  const dice = Math.trunc(Math.random() *6)+1;

  //show the dice Element
  diceEl.classList.remove('hidden');  //remove the hidden class to show the dice
  diceEl.src = `dice-${dice}.png`;  // using the src function similar to img property in html to set another dice image based on the dice value.

  //check for dice 1 if yes :switch player else add to score;
  if(dice !== 1){
    //add dice to score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }else{
    //switch to next player
    playerSwitch(); // set current player current score to zero and switch the player
    
  }
}
});


//button hold function
btnHold.addEventListener('click',function(){
    //update the score with the last current score before switching the player.

    if(isPlaying){
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if(scores[activePlayer]>=100){
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEl.classList.add('hidden');
        isPlaying =false;
    }else{
      playerSwitch(); // set current player current score to zero and switch the player
    }
  }
});


btnNew.addEventListener('click',init);