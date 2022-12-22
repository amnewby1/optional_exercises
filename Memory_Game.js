const gameContainer = document.querySelector("#game");
let firstPick = null;
let secondPick = null;
let cardsFlipped = 0;
let noClicking = false;

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
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
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
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstPick || !secondPick) {
    currentCard.classList.add("flipped");
    firstPick = firstPick || currentCard;
    secondPick = currentCard === firstPick ? null : currentCard;
  }

  if (firstPick && secondPick) {
    noClicking = true;
    // debugger
    let firstColor = firstPick.className;
    let secondColor = secondPick.className;

    if (firstColor === secondColor) {
      cardsFlipped += 2;
      firstPick.removeEventListener("click", handleCardClick);
      secondPick.removeEventListener("click", handleCardClick);
      firstPick = null;
      secondPick = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        firstPick.style.backgroundColor = "";
        secondPick.style.backgroundColor = "";
        firstPick.classList.remove("flipped");
        secondPick.classList.remove("flipped");
        firstPick = null;
        secondPick = null;
        noClicking = false;
      }, 500);
    }
  }

  if (cardsFlipped === COLORS.length)
    alert("YOU FOUND ALL MATCHES!!!  Please refresh to play again.");
}

// when the DOM loads
createDivsForColors(shuffledColors);
