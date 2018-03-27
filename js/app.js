// list of all cards in the game
let card = document.getElementsByClassName('card');
let cards = [...card];

// list of opened cards
let openedCard = document.getElementsByClassName('open');
let opened =  [...openedCard];
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


 // loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', testMatch);
    card.addEventListener('click', endGame);
 };

// Add classes to uncover the card and push it into 'list' of opened
 function displayCard (){
    this.classList.add('open', 'show');
    opened.push(this);
};

// Compare two cards according the data-name
function testMatch () {
	if (opened.length === 2) {
		(opened[0].dataset.name === opened[1].dataset.name)?(match()):(unmatch());
	};
}


// If cards match, add class match and remove open+show classes, clear the 'list' of opened
function match () {
	opened[0].classList.add('match');
	opened[1].classList.add('match');
	opened[0].classList.remove('open', 'show');
	opened[1].classList.remove('open', 'show');
	opened = [];
}

// If cards don't match, add class unmacht, later remove open+show and clear the 'list' of opened
function unmatch () {
	opened[0].classList.add('unmatch');
	opened[1].classList.add('unmatch');
	setTimeout (function() {
		opened[0].classList.remove('open', 'show', 'unmatch');
		opened[1].classList.remove('open', 'show', 'unmatch');
		opened = [];}
		,1000);
}

// when game ends (all cards match) show modal
function endGame () {
	if (matchedCards.length === 16) {
    //modal();
	}
}
 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
