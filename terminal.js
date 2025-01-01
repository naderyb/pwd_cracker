const terminal = document.getElementById('terminal');
const output = document.getElementById('output');
const currentInput = document.getElementById('current-input');
const progressBarContainer = document.createElement('div');
const progressBar = document.createElement('div');
const timerDisplay = document.createElement('div');
const loadingMessage = document.createElement('div');

progressBarContainer.classList.add('progress-bar-container');
progressBar.classList.add('progress-bar');
progressBarContainer.appendChild(progressBar);
loadingMessage.classList.add('loading-message');
timerDisplay.classList.add('timer');

const commandHistory = [];
let historyIndex = -1;
let inputPhase = ''; //tracks the input phase: 'command', 'username', 'password', 'n', 'k'
let username, nValue, kValue;
let startTime, intervalId;

//focus terminal on load
terminal.focus();
terminal.addEventListener('click', () => terminal.focus());

//auto-scroll logic
function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}

//handle keyboard input
document.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const command = currentInput.textContent.trim();
        currentInput.textContent = ''; //clear input

        //display user command
        output.innerHTML += `<p>> ${command}</p>`;

        if (inputPhase === 'username') {
            username = command;
            output.innerHTML += `<p>Enter password:</p>`;
            inputPhase = 'password';
            scrollToBottom();
            return;
        }

        if (inputPhase === 'password') {
            if (command === 'admin') {
                output.innerHTML += `<p>Login successful. Welcome, ${username}!</p>`;
                    output.innerHTML += `<p>Enter N:</p>`;
                    inputPhase = 'n';
            } else {
                output.innerHTML += `<p>Incorrect password. Try again.</p>`;
                inputPhase = 'username';
            }
            scrollToBottom();
            return;
        }

        if (inputPhase === 'n') {
            if (command === 'exit_pwd_crack') {
                exitPwdCrack();
                return;
            }
            nValue = parseInt(command, 10);
            if (isNaN(nValue)) {
                output.innerHTML += `<p>Invalid input. Enter N:</p>`;
            } else {
                output.innerHTML += `<p>Enter K:</p>`;
                inputPhase = 'k';
            }
            scrollToBottom();
            return;
        }

        if (inputPhase === 'k') {
            if (command === 'exit_pwd_crack') {
                exitPwdCrack();
                return;
            }
            kValue = parseInt(command, 10);
            if (isNaN(kValue)) {
                output.innerHTML += `<p>Invalid input. Enter K:</p>`;
            } else {
                output.innerHTML += `<p>Cracking password for N=${nValue} and K=${kValue}...</p>`;
                output.appendChild(loadingMessage);
                output.appendChild(progressBarContainer);
                output.appendChild(timerDisplay);

                //simulate time delay for password cracking (use actual backend API in real-world scenario)
                startTime = Date.now();
                intervalId = setInterval(updateTimer, 1000); //update timer every second
                simulateCrackingProgress();
            }
            scrollToBottom();
            return;
        }

        if (inputPhase === 'post-k') {
            if (command === 'restart') {
                output.innerHTML += `<p>Enter N:</p>`;
                inputPhase = 'n'; //reset to 'n' phase
                progressBar.style.width = '0'; //reset progress bar
                loadingMessage.textContent = ''; //clear loading message
                timerDisplay.textContent = ''; //clear timer
                scrollToBottom();
                return;
            } else if (command === 'exit_pwd_crack') {
                exitPwdCrack();
            } else {
                output.innerHTML += `<p>Invalid input. Type "restart" to enter new values or "exit_pwd_crack" to leave pwd_crack mode.</p>`;
            }
            scrollToBottom();
            return;
        }

        //handle general commands
        if (command === 'pwd_crack') {
            output.innerHTML += `<p>Login required. Enter username:</p>`;
            inputPhase = 'username';
        } else if (command === 'clear') {
            output.innerHTML = '<p>Terminal cleared.</p>';
        } else if (command === 'exit') {
            window.location.href = 'index.html';
        } else if (command === 'help') {
            output.innerHTML += `<p>Commands: pwd_crack, help, clear, exit</p>`;
        } else {
            output.innerHTML += `<p>Unknown command: ${command}</p>`;
        }
        scrollToBottom();
        } else if (event.key === 'Backspace') {
            currentInput.textContent = currentInput.textContent.slice(0, -1);
            scrollToBottom();
        } else if (event.key.length === 1) {
            currentInput.textContent += event.key;
            scrollToBottom();
        }
});

    //function to exit the pwd_crack mode
    function exitPwdCrack() {
        output.innerHTML += `<p>Exited pwd_crack process.</p>`;
        clearInterval(intervalId); // Stop timer
        inputPhase = ''; // Reset the input phase
        loadingMessage.textContent = '';
        progressBar.style.width = '0';
        timerDisplay.textContent = '';
        scrollToBottom();
    }

    //function to update the timer during the cracking process
    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = `Time elapsed: ${elapsedTime} seconds`;
    }

    //function to generate passwords based on N (length) and K (sum of digits)
    function generatePasswords(N, K) {
    const passwords = [];
        function generatePassword(digitsLeft, sumLeft, password) {
        if (digitsLeft === 0) {
            if (sumLeft === 0) {
                passwords.push(password.join(''));
            }
            return;
        }
        for (let digit = 0; digit <= 9; digit++) {
            if (sumLeft - digit >= 0) {
                password.push(digit);
                generatePassword(digitsLeft - 1, sumLeft - digit, password);
                password.pop(); //backtrack
            }
        }
    }
    generatePassword(N, K, []);
    return passwords;
}

    //simulate the password cracking progress
    function simulateCrackingProgress() {
        let progress = 0;
        const total = 100; // Simulated total time for cracking (100%)
        const passwords = generatePasswords(nValue, kValue); //generate passwords based on N and K

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.innerHTML = '<div></div><div></div><div></div><div></div>';
        output.appendChild(spinner);

        const intervalId = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            if (progress >= total) {
                clearInterval(intervalId);
                spinner.remove();
                loadingMessage.textContent = 'Password cracking complete!';
                output.innerHTML += `<p>Cracking complete. Found passwords:</p>`;
                passwords.forEach(password => {
                    output.innerHTML += `<div class="password">${password}</div>`;
                });
                output.innerHTML += `<p>Type "restart" to enter new values or "exit_pwd_crack" to leave pwd_crack mode.</p>`;
                inputPhase = 'post-k';
                scrollToBottom();
            }
        }, 100); //update progress every 100ms
    }
        //spinner CSS
        const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            display: flex;
            justify-content: center;
            margin: 10px 0;
        }
        .spinner div {
            width: 10px;
            height: 10px;
            margin: 2px;
            background-color: green;
            border-radius: 50%;
            animation: spinner 1.2s linear infinite;
        }
        .spinner div:nth-child(1) { animation-delay: -0.45s; }
        .spinner div:nth-child(2) { animation-delay: -0.3s; }
        .spinner div:nth-child(3) { animation-delay: -0.15s; }
        @keyframes spinner {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.5); }
        }
    `;
    document.head.appendChild(spinnerStyle);