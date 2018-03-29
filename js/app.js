// list of all cards in the game
let card = document.getElementsByClassName('card');
let cards = [...card];

// list of opened cards
let openedCard = document.getElementsByClassName('open');
let opened =  [...openedCard];

// list of matched cards
let matchedCards = document.getElementsByClassName('match');

// variable for moves and counting
let moves = 0;
let counter = document.getElementById('moves');

// declaring varibles for time counting
let second = 0, minute = 0, hour = 0;
let countTime;
let timer = document.getElementById('timer');

// modal variables
let myModal = document.getElementById('modal');
let scoreMoves = document.getElementById('moves-score');
let scoreStars = document.getElementById('stars-score');
let scoreTime = document.getElementById('time-score');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// setting moves, starts and time for the new game, hiding the modal
function newGame() {
	// reset card

	cards = shuffle(cards);
    // removing classes from cards
    for (let i = 0; i < cards.length; i++){
    	    cards[i].classList.remove('show', 'open', 'match', 'noclick');
    }
	//reset moves
	moves = 0;
    counter.innerHTML = moves + ' moves';

    // reset time
    clearInterval(countTime);
    second = 0, minute = 0, hour = 0;
    timer.innerHTML = '0 mins 0secs';

    //closing modal
    closeModal();

}

 // loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', testMatch);
    card.addEventListener('click', endGame);
 };

// Add classes to uncover the card and prevent clicking, push it into 'list' of opened
 function displayCard (){
    this.classList.add('open', 'show', 'noclick');
    opened.push(this);
};

// Compare two cards according the data-name + moves counting
function testMatch () {
	if (opened.length === 2) {
		counting ();
		stopClick();
		(opened[0].dataset.name === opened[1].dataset.name)?(match()):(unmatch());
	};
}


// If cards match, add class match and remove open+show classes, clear the 'list' of opened
function match () {
	opened[0].classList.add('match');
	opened[1].classList.add('match');
	opened[0].classList.remove('open', 'show');
	opened[1].classList.remove('open', 'show',);
	opened = [];
	click();
	
}

// If cards don't match, add class unmacht, later remove open+show and clear the 'list' of opened
function unmatch () {
	opened[0].classList.add('unmatch');
	opened[1].classList.add('unmatch');
	setTimeout (function() {
		opened[0].classList.remove('open', 'show', 'unmatch', 'noclick');
		opened[1].classList.remove('open', 'show', 'unmatch', 'noclick');
		opened = [];
		click();}
		,1000);
}


// when game ends (all cards match) show modal
function endGame () {
	if (matchedCards.length === 16) {
    modal();
	}
}



// counting moves
function counting() {
	moves++;
	(moves < 2) ? (counter.innerHTML = moves + ' Move') : (counter.innerHTML = moves + ' Moves');

	//if first move is done, then time counting starts
	if (moves === 1) {time()};
	stars ();
}

// counting time
function time() {
    countTime = setInterval(function(){
        timer.innerHTML = minute+' mins '+second+' secs';
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000); 
}

// Score of stars according to number of moves
function stars () {
	if (moves > 11) {document.getElementById('one').classList.remove('fa-star')};
	if (moves > 17) {document.getElementById('two').classList.remove('fa-star')};
	if (moves > 23) {document.getElementById('three').classList.remove('fa-star')};


}


// message with final score
function modal() {
	clearInterval(countTime);
	let finalT = timer.innerHTML;
	let finalM = counter.innerHTML;
	let finalS = document.getElementsByClassName('stars').innerHTML;
	myModal.classList.add('show-modal');
	scoreMoves.innerHTML= finalM;
	scoreStars.innerHTML= finalS;
	scoreTime.innerHTML=finalT;
}

// closing modal
function closeModal ()  {
    myModal.classList.remove('show-modal');
}


// disabling cards to prevent click on next while two cards are open
function stopClick () {
    for (let i = 0; i < cards.length; i++){
    cards[i].classList.add('noclick'); 
 };
}

// enabling clicking 
function click () {
    for (let i = 0; i < cards.length; i++){
    cards[i].classList.remove('noclick'); 
 };
}

 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


for (let i = 0; i < cards.length; i++){
    	    cards[i].classList.remove('show', 'open', 'match');
    }