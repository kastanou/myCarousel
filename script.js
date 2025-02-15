const slideImages = document.querySelectorAll(".image");

const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

let dots = document.querySelectorAll(".dot");

let counter = 0;

let myInterval;

const defaultTimer = 3000;

const stopButton = document.getElementById("stopButton");
const startButton = document.getElementById("startButton");

const submitButton = document.getElementById("submitButton");

const timerInput = document.getElementById("timerInput");

// Remove animation classes before adding new ones

function removeAnimationClasses() {
  slideImages.forEach((img) => {
    img.classList.remove(
      "slideNext1",
      "slideNext2",
      "slidePrev1",
      "slidePrev2"
    );
  });
}

//Code for next button

next.addEventListener("click", slideNext);

function slideNext() {
  removeAnimationClasses();
  slideImages[counter].classList.add("slideNext1");
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].classList.add("slideNext2");
  indicators();
}

//Code for previous button

prev.addEventListener("click", slidePrev);

function slidePrev() {
  removeAnimationClasses();
  slideImages[counter].classList.add("slidePrev1");
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].classList.add("slidePrev2");
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
  let imageId = parseInt(currentImage.getAttribute("attr"));
  if (imageId > counter) {
    removeAnimationClasses();
    slideImages[counter].classList.add("slideNext1");
    counter = imageId;
    slideImages[counter].classList.add("slideNext2");
  } else if (imageId === counter) {
    return;
  } else {
    removeAnimationClasses();
    slideImages[counter].classList.add("slidePrev1");
    counter = imageId;
    slideImages[counter].classList.add("slidePrev2");
  }
  indicators();
}

//Start button

startButton.addEventListener("click", startInterval);

function startInterval(timer) {
  if (!myInterval) {
    myInterval = setInterval(slideNext, timer ? timer : defaultTimer);
  }
}

//Stop button

stopButton.addEventListener("click", stopInterval);

function stopInterval() {
  if (myInterval) {
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
