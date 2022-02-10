$("#keyboard-upper-container").hide();

let mySentenceArray = ["this bean", " that is", "bee is good"];
let myTotalWords = mySentenceArray.join(" ").split(" ").length;

const gameState = {
  currentSentenceIndex: 0, //which sentence you are on
  currentLetterIndex: 0, //which letter of that sentence you are on
  gameStart: false, //has the game stated yet used to check words per minute
  gameOverMan: false, //has the game ended, used to calculate words per minute and resetting gamestate
  currentInput: null,
  numberOfSentences: mySentenceArray.length,
  //sentenceLength: mySentenceArray[currentGameState.currentSentenceIndex].length-1
}; // set up basic gamestate from video and then add sentences to be read out

let currentGameState = { ...gameState };
//console.log(currentGameState)

$(`<h1 id="beans">${mySentenceArray[currentGameState.currentSentenceIndex]} </h1>`).appendTo("#sentence");

let sentenceLength = mySentenceArray[currentGameState.currentSentenceIndex].length;
//console.log(sentenceLength)
let currentSentence = mySentenceArray[currentGameState.currentSentenceIndex]; //the whole sentence index
let currentLetterToMatch = currentSentence[currentGameState.currentLetterIndex]; //character of the sentence in the index

console.log(currentSentence);
console.log(currentLetterToMatch);

//console.log(currentSentence);
//console.log(currentLetterToMatch);

//console.log(mySentenceArray[gameState.currentSentenceIndex][gameState.currentLetterIndex])

$(document).keydown(function (e) {
  //shift key to set uppercase
  let currentKeyPress = e.keyCode;

  if (currentKeyPress === 16) {
    $("#keyboard-lower-container").hide();
    $("#keyboard-upper-container").show();
  }
  //$(`#${currentKeyPress}`).css('background', "red");
});

$(document).keyup(function (e) {
  //release shift key to set lowercase
  let currentKeyPress = e.keyCode;
  //$(`#${currentKeyPress}`).css('background', "white");
  if (currentKeyPress === 16) {
    $("#keyboard-upper-container").hide();
    $("#keyboard-lower-container").show();
  }
  $("span").css("background-color", "#F5F5F5");
  $(`#${32}`).css("background-color", "#F5F5F5");
});
//console.log(`you need to press ${currentLetterToMatch}`)
//console.log(typeof currentLetterToMatch)

let currentKeyCode;
let currentKey;
console.log(currentGameState);

$(document).keypress(function (e) {
  if (currentGameState.gameOverMan) {
    return;
  }
  currentKeyCode = e.keyCode;
  currentKey = e.key;

  console.log(currentKey);

  if (currentKey === currentLetterToMatch) {
    //this happens when the keypress matches the right letter

    //console.log(currentSentence)
    //console.log(`the ${currentKey} key was pressed`)
    //console.log(currentGameState)
    console.log(`sentenceLength ${sentenceLength}`);

    if (currentLetterToMatch === undefined) {
      console.log(currentGameState);
      console.log(currentGameState.currentSentenceIndex);
      console.log(currentGameState.currentLetterIndex);
    }

    if (currentGameState.currentLetterIndex + 1 == sentenceLength) {
      //this happens when we get to the end of the sentence
      //moveToNextSentence();

      console.log("we have moved to the next sentence");

      if (currentGameState.currentSentenceIndex == currentGameState.numberOfSentences - 1) {
        //this is end of game
        endOfGame();
      } else {
        moveToNextSentence();
      }
    } else {
      currentGameState.currentLetterIndex++;

      //this updates the current letter to match
      //when you press the correct key but are not at the end of the sentence
    }
    currentLetterToMatch = currentSentence[currentGameState.currentLetterIndex];
    if (currentLetterToMatch === " ") {
      console.log(`you must press Space`);
    } else {
      console.log(`you need to press ${currentLetterToMatch}`);
    }
    //console.log(`you need to press ${currentLetterToMatch}`);
  } else {
    youFuckedUp();
    //this happens when the wrong key is pressed
  }

  $(`#${currentKeyCode}`).css("background", randomColor());
  console.log(currentGameState);

  //$('#97').css('');
  //$('#yellow-block').val();
  //console.log(currentSentence)
});

function moveToNextSentence() {
  /** move to next sentence
   * start at position 0 of next sentence
   * display next sentence on page
   */
  currentGameState.currentSentenceIndex++;
  //increments current sentence index...
  currentSentence = mySentenceArray[currentGameState.currentSentenceIndex];
  //...updates current sentence

  currentGameState.currentLetterIndex = 0;
  //this sets the letter to index position 0...
  currentLetterToMatch = currentSentence[currentGameState.currentLetterIndex];
  //...and updates current letter to match

  $("#beans").text(`${mySentenceArray[currentGameState.currentSentenceIndex]}`);
  //this add the current sentence to the page

  sentenceLength = currentSentence.length;

  console.log(sentenceLength);
}

function youFuckedUp() {
  $("#feedback").text("You beansd it");

  //! add funny feedback message later, when andrew cant see
  console.log(`wrong key was pressed, you need to press ${currentLetterToMatch}`);
}

function endOfGame() {
  currentGameState.gameOverMan = true;
  console.log("the game is over");
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);

  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// if char code === id of keyboard keys, change color to green
//! how to translate key press into ascii and then translate ascii back to key strong to be displayed
//! where to display key on page
