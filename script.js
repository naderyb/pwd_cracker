//smooth Scroll for Navigation Links
document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.querySelector('a[href="#hero"]');
    const aProposLink = document.querySelector('a[href="#a-propos"]');
    const howLink = document.querySelector('a[href="#how"]');

    homeLink.addEventListener("click", (e) => {
        e.preventDefault(); //prevent default link behavior
        document.getElementById("hero").scrollIntoView({ behavior: "smooth" });
    });

    aProposLink.addEventListener("click", (e) => {
        e.preventDefault(); //prevent default link behavior
        document.getElementById("a-propos").scrollIntoView({ behavior: "smooth" });
    });

    howLink.addEventListener("click", (e) => {
        e.preventDefault(); //prevent default link behavior
        document.getElementById("how").scrollIntoView({ behavior: "smooth" });
    });
});

//scroll to a propos Section on "commencer" button click
const commencerBtn = document.getElementById("commencer-btn");
const aPropos = document.getElementById("a-propos");

commencerBtn.addEventListener("click", () => {
    aPropos.scrollIntoView({ behavior: "smooth" });
});

//simulate Terminal Commands
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

terminalInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const command = terminalInput.value.trim();
        if (command) {
            terminalOutput.textContent += `> ${command}\nAccess Denied\n`;
            terminalInput.value = "";
        }
    }
});

//redirect to terminal page
const terminalBtn = document.getElementById("terminal-btn");
terminalBtn.addEventListener("click", () => {
    window.location.href = "terminal.html";
});

