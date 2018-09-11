
//array of  the cards classes

const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf',
'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube',
'fa-leaf', 'fa-bicycle', 'fa-bomb' ];




//declar the variables

const deck = document.querySelector(".deck");
let child = deck.children;
let openCards = [];
let matchCards = [] ;
let moves = document.querySelector('.moves');
let counter =0;
let starsNum = 3;
let list = ' ';
let item = ' ';
let gameTimer;
let minutes = document.querySelector('.minu');
let seconds = document.querySelector('.sec');

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


// a func that create the cards
function newBoard() {
  let cardsShuffle = shuffle(cards);
  for (let i = 0; i < cardsShuffle.length; i++) {
    list = document.createElement("li");
    list.className = 'card';
    deck.appendChild(list);

    item = document.createElement('i');
    item.className =  'fa ';
    item.className += cardsShuffle[i];
    list.appendChild(item);
  }

}

window.onload= newBoard();

//add the match class function remove the 'open' and 'show' class when it match add the 'match' class
function match() {
  matchCards.push(openCards)
  for (let i = 0; i < openCards.length; i++) {
    openCards[i].classList.remove('open', 'show');
    openCards[i].className += ' match';
  }
  openCards.splice(0, 2);
}

//
 // close the card then it does not match
function close() {
  for (let i = 0; i < openCards.length; i++) {
    openCards[i].classList.remove('noDouble', 'nomatch', 'open', 'show');
  }
  openCards.splice(0, 2);
}

//the nomatch function if the two cards don't match
function nomatch() {
  for (let i = 0; i < openCards.length; i++) {
    openCards[i].classList.add('nomatch');
  }
}

//timer
function time() {
  let min = 0;
  let sec = 0;
  gameTimer = setInterval(function() {
    if (sec === 60) {
      min += 1
      sec = 0
    }
    minutes.innerText = min;
    seconds.innerText = sec++;
  }, 1000);
}

//start time() after the first click
deck.addEventListener('click', time, {once: true});

// a func that keep track of the moves
function addMoves() {
  counter++;
  moves.innerText = counter;
}

//it check if the cards match ? it reset back to defaul
function checker() {
  if(openCards.length ===2) {
    if (openCards[0].querySelector('i').className === openCards[1].querySelector('i').className) {
      match();
    }else{
      nomatch()
      setTimeout(function() {
        close();
      }, 850);
    }
    addMoves();
  }
}

// it alert the popUP function when all the cards match
function win() {
  if (matchCards.length === 8) {
    //stop the time before calling the popUp func
    clearInterval(gameTimer);
    setTimeout(function() {
      popUp();
    },  1000);
  }
}


// it control the stars by removing it base on how many moves
function stars() {
  let two = document.getElementById('two');
  let three = document.getElementById('three')
  if(counter === 20){
    two.style.display = 'none';
    starsNum = 2;
  }else if (counter === 26 ) {
    three.style.display = 'none';
    starsNum = 1;
  }
}


// the popUp alert when the user win the game
function popUp() {
  let pop = document.querySelector('.popbox');
  pop.style.display = "block";
  let again = document.querySelector('.again');
  let ouput = document.querySelector('.outPut');
  ouput.innerText = "With " + counter + ' moves and ' + starsNum + ' stars.';
  ouput.innerText += "\n" +minutes.innerHTML + " min  " + seconds.innerHTML + " sec.";
  again.addEventListener('click', function() {
    pop.style.display = 'none';
    location.reload();
  });
}


//the click func and return the result
function clicker() {
  deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
      if (openCards.length === 2) {
        return;
      }
      if (event.target.classList.contains('match')) {
        return;
      }
      event.target.classList.add('noDouble', 'open', 'show');
      openCards.push(event.target);
    }
    checker();
    stars()
    win();
  });
}
clicker();

// reset the game button by reloading  the page.
function reset() {
  const restart = document.querySelector('.restart');
  restart.addEventListener('click', function() {
    location.reload();
  });
}
reset();
