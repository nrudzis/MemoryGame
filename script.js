const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

const matches = [];

let eventTargets = [];

let activePair = [];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  eventTargets.push(event.target);
  if(eventTargets[0] !== eventTargets[1]) {
    let color = event.target.className;
    event.target.style.backgroundColor = color;
    if(matches.indexOf(color) < 0 && activePair.length < 2) {
      activePair.push(color);
      if(activePair.length === 2) {
        if(activePair[0] !== activePair[1]) {
          setTimeout(function() {
            let firstColor = document.querySelectorAll(`.${activePair[0]}`);
            for(let i = 0; i < firstColor.length; i++) {
              firstColor[i].style.backgroundColor = null;
            }
            let secondColor = document.querySelectorAll(`.${activePair[1]}`);
            for(let i = 0; i < secondColor.length; i++) {
              secondColor[i].style.backgroundColor = null;
            }
            activePair = [];
            eventTargets = [];
          }, 1000);
        } else {
          matches.push(color);
          activePair = [];
          eventTargets = [];
        }
      }
    }
  } else {
    eventTargets.pop();
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
