const hintButton = document.getElementById('hint-button');
const hintContainer = document.getElementById('hint-container');

hintButton.addEventListener('click', () => {
    hintContainer.classList.add('active');
    hintContainer.setAttribute('aria-hidden', 'false');
});

hintContainer.addEventListener('click', (e) => {
    if (e.target === hintContainer) {
        hintContainer.classList.remove('active');
        hintContainer.setAttribute('aria-hidden', 'true');
    }
});

const choicesSection = document.getElementById('choices');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const subtext = document.getElementById('subtext');
const playAgainBtn = document.getElementById('play-again');

const playerScoreEl = document.getElementById('player-score');
const enemyScoreEl = document.getElementById('enemy-score');

let playerScore = 0;
let enemyScore = 0;

const translations = {
    rock: "Pedra",
    paper: "Papel",
    scissor: "Tesoura"
};

window.playerChoice = (hand) => {
    playTheGame(hand, machineChoice());
};

function machineChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    return choices[Math.floor(Math.random() * 3)];
}

function playTheGame(human, machine) {
    let result = "";

    if (human === machine) {
        result = "Deu empate!";
    } else if (
        (human === "rock" && machine === "scissor") ||
        (human === "scissor" && machine === "paper") ||
        (human === "paper" && machine === "rock")
    ) {
        result = "Você ganhou!";
        playerScore++;
    } else {
        result = "Você perdeu!";
        enemyScore++;
    }

    playerScoreEl.textContent = playerScore;
    enemyScoreEl.textContent = enemyScore;

    choicesSection.style.opacity = "0";
    choicesSection.style.transform = "translateY(8px) scale(0.98)";

    const transitionTime = 600;
    setTimeout(() => {
        choicesSection.classList.add('hidden');
        choicesSection.style.opacity = "";
        choicesSection.style.transform = "";

        resultMessage.textContent = result;
        resultMessage.classList.remove('win', 'lose', 'tie');
        if (result === "Você ganhou!") resultMessage.classList.add('win');
        else if (result === "Você perdeu!") resultMessage.classList.add('lose');
        else resultMessage.classList.add('tie');

        subtext.textContent = `Você jogou: ${translations[human]} | Máquina jogou: ${translations[machine]}`;

        resultContainer.classList.add('active');

    }, transitionTime);
}

playAgainBtn.addEventListener('click', () => {
    resultContainer.classList.remove('active');

    const hideTime = 480;
    setTimeout(() => {
        choicesSection.classList.remove('hidden');

        choicesSection.style.opacity = "0";
        choicesSection.style.transform = "translateY(8px) scale(0.98)";

        requestAnimationFrame(() => {
            setTimeout(() => {
                choicesSection.style.opacity = "1";
                choicesSection.style.transform = "translateY(0) scale(1)";
                setTimeout(() => {
                    choicesSection.style.opacity = "";
                    choicesSection.style.transform = "";
                }, 520);
            }, 20);
        });

        resultMessage.textContent = "";
        resultMessage.classList.remove('win', 'lose', 'tie');
        subtext.textContent = "";

    }, hideTime);
});