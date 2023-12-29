let fichas = ["🟢", "❌"];
let partidaAcabada = false;
let botones = Array.from(document.querySelectorAll(".boton"));
let jugadorUno = true;
let controlFichas = 0;
ganador = false;
const tablero = document.getElementById("tablero");
const mensajeFinal = document.querySelector(".mensajeFinal");
const reiniciar = document.getElementById("reiniciar");
//Variable para usar luego el efecto de confetti
const jsConfetti = new JSConfetti();

//Cada vez que se presione el boton reiniciar va a setear todos los valores y colocar en blanco los botones o fichas de juego
reiniciar.addEventListener("click", () => {
    for (let i = 0; i < botones.length; i++) {
        botones[i].innerHTML = "";
    }
    controlFichas = 0;
    partidaAcabada = false;
    ganador = false;
    mensajeFinal.style.visibility = "hidden";
});

//Funcion para recorrer todos los botones
const userMove = (e) => {
    //Tenemos que comprobar que el las fichas no hayan llegado a 9, que el boton este vacio y que la partida no haya acabado
    if (controlFichas < 9 && e.target.innerHTML == "" && !partidaAcabada) {
        //Con esta variable agarramos el inner del boton seleccionado para luego colocarle un valor
        let botonValue = e.target.innerHTML;
        //Si el valor que tenemos no tiene nada entramos al if
        if (!botonValue.length) {
            //Al contenido del boton le colocamos un O, o una X dependiendo de si el jugador uno es true o false, ya luego le cambiamos ese valor para que el proximo tengo lo contrario del primero
            e.target.innerHTML = jugadorUno ? "🟢" : "❌";
            jugadorUno = !jugadorUno;
            //Llamamos a la funcion comparar lineas para que va comparando las lineas ganadoras con las posiciones de nuestro arreglo
            CompararLineas(0, 1, 2);
            CompararLineas(3, 4, 5);
            CompararLineas(6, 7, 8);
            CompararLineas(0, 3, 6);
            CompararLineas(1, 4, 7);
            CompararLineas(2, 5, 8);
            CompararLineas(0, 4, 8);
            CompararLineas(6, 4, 2);
        }
        //Este lleva la cuenta de cuantos tiros o botones han sido presionados
        controlFichas++;
    }
    //Si el controlFichas ya llego a 9 la partida ya acabo
    if (controlFichas == 9) {
        partidaAcabada = true;
    }

    //Si la partida ya acabo y la variable ganador sigue siendo false, mostramos que es un empate
    if (partidaAcabada == true && ganador == false) {
        mensajeFinal.style.visibility = "visible";
        mensajeFinal.innerHTML = "Quedaron empate";
    }
};

//Creamos un for para que le agregue el evento a cada boton
for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", userMove);
}

//Comparamos las posiciones que para ver si ya hay un ganador
const CompararLineas = (c1, c2, c3) => {
    if (
        !partidaAcabada &&
        botones[c1].innerHTML.length &&
        botones[c1].innerHTML == botones[c2].innerHTML &&
        botones[c1].innerHTML == botones[c3].innerHTML
    ) {
        //En caso coincidan se llama a la funcion mostrarGanador
        mostrarGanador(botones[c1].innerHTML);
    }
};

//Esta funcion recibe el jugador que gano ya sea el O o la X, termina la partida y cambia la variable ganador a true, y dispara el evento confetti para que muestre el efecto
const mostrarGanador = (player) => {
    partidaAcabada = true;
    ganador = true;
    mensajeFinal.style.visibility = "visible";
    mensajeFinal.innerHTML = "Gano el jugador " + player;
    jsConfetti.addConfetti({
        emojiSize: 50,
        confettiNumber: 60,
        emojis: ["🏆", "⚡️", "💥", "✨", "😋", "😉", "🤩"],
    });
};

//Esta es la parte donde cambiamos el background de nuestro tablero dependiendo del boton que presione el usuario
document.getElementById("tab1").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab1.avif)";
});

document.getElementById("tab2").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab2.avif)";
});

document.getElementById("tab3").addEventListener("click", () => {
    tablero.style.backgroundImage = "url(assets/tab3.avif)";
});
