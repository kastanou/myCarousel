const list = [1, 2, 3, 4, 5, 6]; // we will get all the same elements with class querySelectorAll() => [div, div, .....]
let activeIndex = 0; // single source of truth
let myInterval;
const timerInput = document.getElementById('timer');


// function showNumbers(buttonLabel) {
//     console.log(list, buttonLabel)
// }


function showActive() {
    console.log('activeIndex', activeIndex); // is the index
    console.log('Number in the active index', list[activeIndex]) // this is the number in the index
}

function showNext() {

    activeIndex += 1

    if (activeIndex >= list.length) {
        activeIndex = 0;
    }

    showActive();
}

function showPrevious() {
    activeIndex -= 1;

    if (activeIndex < 0) {
        activeIndex = list.length - 1;
    }

    showActive();
}

function showDot(i) {
    // activeIndex = i;
    // showActive();
    console.log(i);
}

function startInterval(mSeconds) {
    if (!myInterval) { // we check if the variable has a value. If yes we DO NOT NEED ANOTHER INTERVAL. If no we start a new interval;
        myInterval = setInterval(showNext, mSeconds ? mSeconds : 3000); // if mSeconds has value set the mSeconds as timer value or if is falsy then se the default value of 3000ms
    }

}


function stopInterval() {
    clearInterval(myInterval);
    myInterval = null;
}


timerInput.addEventListener('change', () => {
    // we want the value of the input
    const newTimer = document.forms[0].timer.value;
    stopInterval();
    startInterval(newTimer);
})


startInterval();
