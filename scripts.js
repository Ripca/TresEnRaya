let fichas = ["🟢", "❌"];
let partidaAcabada = false;
let botones = Array.from(document.querySelectorAll(".boton"));
let isPlayOne = true;
let controlFichas = 0;
winner = false;
const tablero = document.getElementById("tablero");
const mensajeFinal = document.querySelector(".mensajeFinal");
const jsConfetti = new JSConfetti();

document.getElementById("reiniciar").addEventListener("click", () => {
    for (let i = 0; i < botones.length; i++) {
        botones[i].innerHTML = "";
    }
    controlFichas = 0;
    partidaAcabada = false;
    winner = false;
    mensajeFinal.style.visibility = "hidden";
});

const userMove = (e) => {
    if (controlFichas < 9 && e.target.innerHTML == "" && !partidaAcabada) {
        let botonValue = e.target.innerHTML;
        if (!botonValue.length) {
            e.target.innerHTML = isPlayOne ? "🟢" : "❌";
            isPlayOne = !isPlayOne;
            checkLine(0, 1, 2);
            checkLine(3, 4, 5);
            checkLine(6, 7, 8);
            checkLine(0, 3, 6);
            checkLine(1, 4, 7);
            checkLine(2, 5, 8);
            checkLine(0, 4, 8);
            checkLine(6, 4, 2);
        }
        controlFichas++;
    }

    if (controlFichas == 9) {
        partidaAcabada = true;
    }

    if (partidaAcabada == true && winner == false) {
        mensajeFinal.style.visibility = "visible";
        mensajeFinal.innerHTML = "Quedaron empate";
    }
};

for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", userMove);
}

const checkLine = (c1, c2, c3) => {
    if (
        !partidaAcabada &&
        botones[c1].innerHTML.length &&
        botones[c1].innerHTML == botones[c2].innerHTML &&
        botones[c1].innerHTML == botones[c3].innerHTML
    ) {
        showWinner(botones[c1].innerHTML);
    }
};

const showWinner = (player) => {
    partidaAcabada = true;
    winner = true;
    mensajeFinal.style.visibility = "visible";
    mensajeFinal.innerHTML = "Gano el jugador " + player;
    jsConfetti.addConfetti({
        emojiSize: 50,
        confettiNumber: 60,
        emojis: ["🏆", "⚡️", "💥", "✨", "😋", "😉", "🤩"],
    });
};

document.getElementById("tab1").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab1.avif)";
});

document.getElementById("tab2").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab2.avif)";
});

document.getElementById("tab3").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab3.avif)";
});
