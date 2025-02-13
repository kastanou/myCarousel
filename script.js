const slideImages = document.querySelectorAll("img");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let dots = document.querySelectorAll(".dot");

let counter = 0;

let myInterval;

const defaultTimer = 3000;

stopButton = document.getElementById("stopButton");
startButton = document.getElementById("startButton");

submitButton = document.getElementById("submitButton");

const timerInput = document.getElementById("timerInput");

//Code for next button

next.addEventListener("click", slideNext);

function slideNext() {
  slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}

//Code for previous button

prev.addEventListener("click", slidePrev);

function slidePrev() {
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

//Add and remove active class from the indicators

function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

//Add click event to the indicator

function switchImage(currentImage) {
  currentImage.classList.add("active");
  let imageId = currentImage.getAttribute("attr");
  if (imageId > counter) {
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (imageId === counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indicators();
}

//Start button

startButton.addEventListener("click", startInterval());

function startInterval(timer) {
  if (!myInterval) {
    myInterval = setInterval(slideNext, timer ? timer : defaultTimer);
  }
}

//Stop button

stopButton.addEventListener("click", stopInterval);

function stopInterval() {
  if (myInterval) {
    slideImages.forEach((image) => {
      image.removeAttribute("style");
    });

    clearInterval(myInterval);
    myInterval = null;
  }
}

//Autosliding

function autoSliding() {
  startInterval(defaultTimer);
}

//Code for timer

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  setNewTimer();
});

function setNewTimer() {
  let newTimer = timerInput.value;
  if (!isNaN(newTimer) && newTimer > 0) {
    stopInterval();
    startInterval(newTimer);
  } else {
    alert("Please enter a valid number greater than 0");
  }
}

autoSliding();
