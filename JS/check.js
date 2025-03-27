let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

const originalValues = {
    seconds: seconds,
    minutes: minutes,
    hours: hours
};

const toggleBtn = document.getElementById("toggle-btn");
const timeUpdateButton = document.getElementById("time-update-button");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

toggleBtn.addEventListener("click", () => {
    // Hide or show inputs and confirm button
    minutesInput.classList.toggle("hidden");
    secondsInput.classList.toggle("hidden");
    timeUpdateButton.classList.toggle("hidden");
});

timeUpdateButton.addEventListener("click", () => {
    // Update minutes and seconds from input
    const min = parseInt(minutesInput.value) || 0;
    const sec = parseInt(secondsInput.value) || 0;
    
    minutes = min;
    seconds = sec;
    updateDisplay();
    console.log("Updated Time:", minutes, "minutes", seconds, "seconds");
});


document.getElementById('start').addEventListener('click', function() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
});

document.getElementById('stop').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    timerInterval = null;
    // Reset values to the originally set ones
    // seconds = originalValues.seconds;
    // minutes = originalValues.minutes;
    // hours = originalValues.hours;
    const min = parseInt(minutesInput.value) || 0;
    const sec = parseInt(secondsInput.value) || 0;
    
    minutes = min;
    seconds = sec;
    updateDisplay();
});

function updateNumber(partId, newValue) {
    const elementUpper = document.getElementById(`${partId}-upper`);
    const elementLower = document.getElementById(`${partId}-lower`);
    if (elementUpper.dataset.number !== newValue) {
        elementUpper.classList.add('flipping-upper');
        elementLower.classList.add('flipping-lower');

        setTimeout(() => {
            elementUpper.textContent = newValue;
            elementLower.textContent = newValue;
            elementUpper.dataset.number = newValue;
            elementLower.dataset.number = newValue;
        }, 300);

        elementUpper.addEventListener('animationend', () => {
            elementUpper.classList.remove('flipping-upper');
        });

        elementLower.addEventListener('animationend', () => {
            elementLower.classList.remove('flipping-lower');
        });
    }
}

function updateDisplay() {
    // console.log(minutes)
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;

    updateNumber('minutes-tens', minutesTens.toString());
    updateNumber('minutes-ones', minutesOnes.toString());
    updateNumber('seconds-tens', secondsTens.toString());
    updateNumber('seconds-ones', secondsOnes.toString());
}

updateDisplay();
