$("#keyboard-upper-container").hide();

let mySentenceArray = [
  `What the flip did you just flapping say about me, Ervin Howell?`,
  `I'll have you know I graduated top of my class at Master Tang's Dojo,`,
  `and I've been involved in numerous secret raids on Evil Betty's forces, and I have over 300 confirmed victories.`,
  `I am trained in Face-to_Foot style and I'm the top man in the entire whatever country we live in. `,
  `You are nothing to me but just another target.`,
  `I will wipe you the flap out with precision the likes of which has never been seen before on this Eaerth, mark my flipping words.`,
  `You think you can get away with saying that shite to me over the Interwebs?`,
  `Think again, Ervin Howell.`,
  `As we speak I am contacting my secret network of spies across Boosegumps`,
  `and your IPPPPPP is being traced right now so you better prepare for the storm, my little guy.`,
  `The storm that wipes out the pathetic ickle itty bitty thing you call your life.`,
  `You're flopping un-alive, kiddo.`,
  `I can be anyWhomst'd've'ly'yaint'nt'ed'ies's'y'es, anything, anywhen, anywhere, anywhy, anyhow`,
  `and I can kill you in over seven hundred ways, and that's just with my bear hands.`,
  `Not only am I extensively trained in Face_to-Foot and My-Nuts-to_your-Fist, Clap-these-Cheeks style,`,
  `but I have access to the entire arsenal of Pork_and_Beans`,
  `and I will use it to its full extent to wipe your miserable booty off the face of the continent, you little insect.`,
  `If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you,`,
  `maybe you would have held your flogging tongue.`,
  `But you couldn't, you didn't, and now you're paying the price,`,
  `you gotdamn idiot.`,
  `I will poopoo fury all over you and you will drown in it.`,
  `You're flanking unpersoned, kiddo.`,
];
//these are my amazing sentences
let myTotalWords = mySentenceArray.join(" ").split(" ").length;
// set mySentenceArray to clipart font
// write out wimp lo copy pasta
const gameState = {
  currentSentenceIndex: 0, //which sentence you are on
  currentLetterIndex: 0, //which letter of that sentence you are on
  gameStart: false, //has the game stated yet used to check words per minute
  gameOverMan: false, //has the game ended, used to calculate words per minute and resetting gamestate
  currentInput: null,
  incorrectKeyPress: 0,
  numberOfSentences: mySentenceArray.length,
  //sentenceLength: mySentenceArray[currentGameState.currentSentenceIndex].length-1
}; // set up basic gamestate from video and then add sentences to be read out

let currentGameState = { ...gameState };
//console.log(currentGameState)

//$(`<h1 id="beans">${mySentenceArray[currentGameState.currentSentenceIndex]} </h1>`).appendTo("#sentence");
$("#beans").text(`${mySentenceArray[currentGameState.currentSentenceIndex]}`);

let sentenceLength = mySentenceArray[currentGameState.currentSentenceIndex].length;
//console.log(sentenceLength)
let currentSentence = mySentenceArray[currentGameState.currentSentenceIndex]; //the whole sentence index
let currentLetterToMatch = currentSentence[currentGameState.currentLetterIndex]; //character of the sentence in the index
let target = $("#target-letter");
let s;
$(target).text(currentLetterToMatch);

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

    let audio1 = new Audio(`Good_Noice.mp4`);
    audio1.play();

    // fire good sound effect here
    if (currentGameState.gameStart === false) {
      s = Date.now();
      currentGameState.gameStart = true;
    }

    $("#yellow-block").css("width", "+=17.5");
    // set up yellow block to move across currentLetterToMatch and then reset when nextSentence fires

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

    if (currentLetterToMatch === " " && currentGameState.gameOverMan === false) {
      //console.log(`you must press Space`);
      $(target).text("SPACE");
    } else if (currentGameState.gameOverMan === false) {
      $(target).text(currentLetterToMatch);
      //console.log(`you need to press ${currentLetterToMatch}`);
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

  //! fire next sentence sound effect

  let audio3 = new Audio(`Mid_Noice.mp4`);
  audio3.play();

  $("#yellow-block").css({
    position: "absolute",
    left: "22.8",
    "margin-top": "6px",
    width: "15px",
    height: "20px",
    "background-color": "yellow",
    "z-index": "-20",
  });

  console.log(sentenceLength);
}

function youFuckedUp() {
  currentGameState.incorrectKeyPress++;
  $("#feedback").text(`Mavis Beacon will remember you beans'd it ${currentGameState.incorrectKeyPress} times`);
  //creates negative feedback
  let audio2 = new Audio(`Bad_Noice.mp3`);
  audio2.play();
  // fire bad sound effect

  setTimeout(function () {
    $("#feedback").html(`&nbsp;`);
  }, 3000);
  //removes the negative feedback after 3 seconds
  // add funny feedback message later, when andrew cant see
  //console.log(`wrong key was pressed, you need to press ${currentLetterToMatch}`);
}

function endOfGame() {
  currentGameState.gameOverMan = true;
  $(target).text("Game Over, You Survived");
  //set words per minute
  let endTime = Date.now();
  let elapsedTime = (endTime - s) / 1000 / 60;
  let wordsPerMinute = myTotalWords / elapsedTime - 4 * currentGameState.incorrectKeyPress;
  // set punishement number to higher when andrew cant see
  //Swal.fire(`Your Score is ${wordsPerMinute.toFixed(2)} Words per Minute`);

  Swal.fire({
    title: "Would you like to Play Again??",
    text: `Your Score is ${wordsPerMinute.toFixed(2)} Words per Minute, You made ${currentGameState.incorrectKeyPress} mistakes.`,
    showDenyButton: true,

    confirmButtonText: "Yes",
    denyButtonText: `Heck No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      resetGame();
      console.log(currentGameState);
      // put resetGame function here
      // set game back to base state to be played again
    } else if (result.isDenied) {
      // redirect to mavis beacon teaches typing
      window.location.assign("https://www.broderbund.com/education");
    }
  });
  console.log("the game is over");
}

function resetGame() {
  currentGameState = { ...gameState };
  $("#beans").text(`${mySentenceArray[currentGameState.currentSentenceIndex]}`);
  sentenceLength = mySentenceArray[currentGameState.currentSentenceIndex].length;
  currentSentence = mySentenceArray[currentGameState.currentSentenceIndex]; //the whole sentence index
  currentLetterToMatch = currentSentence[currentGameState.currentLetterIndex]; //character of the sentence in the index
  target = $("#target-letter");
  s = undefined;
  $(target).text(currentLetterToMatch);

  $("#yellow-block").css({
    position: "absolute",
    left: "22.8",
    "margin-top": "6px",
    width: "15px",
    height: "20px",
    "background-color": "yellow",
    "z-index": "-20",
  });
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);

  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

// if char code === id of keyboard keys, change color to green
// how to translate key press into ascii and then translate ascii back to key strong to be displayed
// where to display key on page
