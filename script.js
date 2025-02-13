const slideImages = document.querySelectorAll("img");  //FIXME: not a good practice as if you add a new image in the page you will include this in your carousel even if it is anywhere in the page. Try to group them with a class

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let dots = document.querySelectorAll(".dot");

let counter = 0;

let myInterval;

const defaultTimer = 3000;

stopButton = document.getElementById("stopButton");   //FIXME: where is const let?
startButton = document.getElementById("startButton"); //FIXME: where is const let?

submitButton = document.getElementById("submitButton"); //FIXME: where is const let?

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
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
  if (counter >= slideImages.length - 1) {
  if (counter == 0) {  //FIXME: always use === instead of ==
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
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
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
    counter = imageId;
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
  } else if (imageId === counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards"; //FIXME: try to add the css transtion logic inside the class and toogle with add remove class from classList. [Separation of concerns Princical]
  }
  indicators();
}

//Start button

startButton.addEventListener("click", startInterval());  //FIXME:  inside addEventListener we add function not the result of it so you need you need to add startInterval instead of startInterval()

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
      image.removeAttribute("style"); //FIXME: again as mentioned above try to play with a specific class instead of style. There is a chance that in the applicaiton you may add a style in the future. By removing all the attribute you will face a bug as you will remove all the styles
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
