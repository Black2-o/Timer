let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

document.getElementById('start').addEventListener('click', function() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes >= 60) {
                hours++;
                minutes = 0;
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
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
});

function updateDisplay() {
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

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
        }, 300); // Midway through the animation

        // Reset the animation by removing the classes
        elementUpper.addEventListener('animationend', () => {
            elementUpper.classList.remove('flipping-upper');
        });

        elementLower.addEventListener('animationend', () => {
            elementLower.classList.remove('flipping-lower');
        });
    }
}



function updateDisplay() {
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;

    updateNumber('minutes-tens', minutesTens.toString());
    updateNumber('minutes-ones', minutesOnes.toString());
    updateNumber('seconds-tens', secondsTens.toString());
    updateNumber('seconds-ones', secondsOnes.toString());
}
updateDisplay() 