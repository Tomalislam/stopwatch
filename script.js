let startTime;
let timerInterval;
let currentSeconds = 29 * 60 + 8; // Default starting time in seconds

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
        }
    }, 1000);
}

document.getElementById('continue').addEventListener('click', () => {
    if (!timerInterval) {
        startTimer();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    const endTime = new Date();
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = `Reset on ${endTime.toLocaleString()} | Start: ${startTime ? startTime.toLocaleTimeString() : 'N/A'} | End: ${endTime.toLocaleTimeString()}`;
    document.getElementById('log').appendChild(logEntry);

    clearInterval(timerInterval);
    timerInterval = null;
    currentSeconds = 29 * 60 + 8; // Reset to initial value
    updateTimerDisplay();
});

updateTimerDisplay();
