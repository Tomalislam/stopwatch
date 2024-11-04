let startTime;
let timerInterval;
let elapsedTime = 0; // Time in milliseconds
let isRunning = false;

// Load previous elapsed time and logs from localStorage
window.addEventListener('load', () => {
    if (localStorage.getItem('elapsedTime')) {
        elapsedTime = parseInt(localStorage.getItem('elapsedTime'), 10);
        updateStopwatchDisplay();
    }

    if (localStorage.getItem('log')) {
        document.getElementById('log').innerHTML = localStorage.getItem('log');
        if (document.getElementById('log').innerHTML !== '') {
            document.getElementById('clear-log').style.display = 'inline-block';
        }
    }
});

function updateStopwatchDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateStopwatchDisplay();
        localStorage.setItem('elapsedTime', elapsedTime.toString());
    }, 1000);
    document.getElementById('control').textContent = 'Pause';
    isRunning = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    document.getElementById('control').textContent = 'Start';
    isRunning = false;
}

document.getElementById('control').addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

document.getElementById('reset').addEventListener('click', () => {
    if (elapsedTime > 0) {
        const endTime = new Date();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `${endTime.toLocaleString()} | Total Time: ${document.getElementById('stopwatch').textContent}`;
        document.getElementById('log').appendChild(logEntry);
        document.getElementById('clear-log').style.display = 'inline-block';

        // Save log to localStorage
        localStorage.setItem('log', document.getElementById('log').innerHTML);
    }

    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    localStorage.removeItem('elapsedTime'); // Clear elapsed time from storage
    updateStopwatchDisplay();
    document.getElementById('control').textContent = 'Start';
    isRunning = false;
});

document.getElementById('clear-log').addEventListener('click', () => {
    document.getElementById('log').innerHTML = '';
    document.getElementById('clear-log').style.display = 'none';
    localStorage.removeItem('log'); // Clear log from storage
});

// Initial display update
updateStopwatchDisplay();
