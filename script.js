let startTime;
let timerInterval;
let currentSeconds = 29 * 60 + 8; // Default starting time in seconds
let isRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
    const seconds = (currentSeconds % 60).toString().padStart(2, '0');
    document.getElementById('timer').textContent = `00:${minutes}:${seconds}`;
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        if (currentSeconds > 0) {
            currentSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('control').textContent = 'Continue';
            isRunning = false;
        }
    }, 1000);
    document.getElementById('control').textContent = 'Pause';
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('control').textContent = 'Continue';
    isRunning = false;
}

document.getElementById('control').addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    const endTime = new Date();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = `Reset on ${endTime.toLocaleString()} | Start: ${startTime ? startTime.toLocaleTimeString() : 'N/A'} | End: ${endTime.toLocaleTimeString()}`;
    document.getElementById('log').appendChild(logEntry);
    document.getElementById('clear-log').style.display = 'inline-block';

    clearInterval(timerInterval);
    timerInterval = null;
    currentSeconds = 29 * 60 + 8; // Keep original time
    updateTimerDisplay();
    document.getElementById('control').textContent = 'Continue';
    isRunning = false;
});

document.getElementById('clear-log').addEventListener('click', () => {
    document.getElementById('log').innerHTML = '';
    document.getElementById('clear-log').style.display = 'none';
});

updateTimerDisplay();
