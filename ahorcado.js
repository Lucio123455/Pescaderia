const palabrasPosibles = ['SALMON', 'MERLUZA', 'HIPOCAMPO', 'TRUCHA', 'DORADA',
    'SARDINA', 'ATUN', 'BACALAO', 'ROBALO', 'ANCHOA', 'RAPE'];

let vidas = 5;
let palabraDeLaPartida;
let juego

function comenzarJuego() {
    palabraDeLaPartida = seleccionarPalabraDeLaPartida();
    console.log('Palabra seleccionada:', palabraDeLaPartida);
    escribirGuiones(palabraDeLaPartida);
    vidas = 5;
    const vidasTextContent = document.getElementById("vidas")
    vidasTextContent.textContent = vidas
    juegoIniciado = true
}

function seleccionarLetra(letra) {
    if (juegoIniciado === true) {
        buscarYCompletarPalabra(palabraDeLaPartida, letra);
        revisarSiGanaste()
    }
}

function revisarSiGanaste() {
    let guiones = mesa.getElementsByTagName("span");
    let letrasAdivinadas = 0;

    for (let i = 0; i < guiones.length; i++) {
        if (guiones[i].textContent !== '_ ') {
            letrasAdivinadas++;
        }
    }

    if (vidas >= 0 && letrasAdivinadas === palabraDeLaPartida.length) {
        alertaDeJuego("gano")
        juegoIniciado = false
    } else if (vidas <= 0) {
        completarPalabra()
        alertaDeJuego("perdio")
        juegoIniciado = false
    }
}

function alertaDeJuego(ganoOPerdio) {
    let title = ganoOPerdio === "gano" ? "¡Felicidades, ganaste!" : "¡Lo siento, perdiste!";
    let background = ganoOPerdio === "gano" ? "#c3e6cb" : "#f8d7da";
    let icon = ganoOPerdio === "gano" ? "success" : "error";
    let imageUrl = ganoOPerdio === "gano" ? "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHRnd2tudGI4aHdzY3Fzc3BuMXZ1M2hvNTd3bTA0b25weGh5aHZyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1GTZA4flUzQI0/giphy.gif" : 
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmZpZWduNDl1cTM0dzBqdjhnZGwxZDVjNDJrbnZucDJtMWlyY2pucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif";
    Swal.fire({
        title: title,
        icon: icon,
        width: 600,
        padding: "3em",
        background: background,
        showConfirmButton: false,
        timer: 2500,
        backdrop: `
        rgba(0,0,123,0.4)
        url(${imageUrl})
        left top
        no-repeat
        `
    });
}


function completarPalabra() {
    let guiones = mesa.getElementsByTagName("span");
    for (let i = 0; i < palabraDeLaPartida.length; i++) {
        guiones[i].textContent = palabraDeLaPartida[i];
    }
}

function buscarYCompletarPalabra(palabraDeLaPartida, letraDeLaRonda) {
    let mesa = document.getElementById("mesa");
    let guiones = mesa.getElementsByTagName("span");
    let encontrada = false; // Variable para indicar si se encontró la letra

    for (let i = 0; i < palabraDeLaPartida.length; i++) {
        if (palabraDeLaPartida[i] === letraDeLaRonda) {
            guiones[i].textContent = letraDeLaRonda;
            encontrada = true;
        }
    }

    if (!encontrada) {
        vidas--;
    }

    const vidasTextContent = document.getElementById("vidas")
    vidasTextContent.textContent = vidas
}

function seleccionarPalabraDeLaPartida() {
    const indiceAleatorio = Math.floor(Math.random() * palabrasPosibles.length);
    return palabrasPosibles[indiceAleatorio];
}

function escribirGuiones(palabraDeLaPartida) {
    const mesa = document.getElementById("mesa");
    mesa.innerHTML = ""; // Limpiar la mesa antes de agregar nuevos guiones

    for (let i = 0; i < palabraDeLaPartida.length; i++) {
        const guion = document.createElement("span");
        guion.textContent = "_ ";
        guion.style.fontSize = "80px";
        mesa.appendChild(guion);
    }
}
