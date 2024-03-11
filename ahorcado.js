const palabrasPosibles = ['SALMON', 'MERLUZA', 'HIPOCAMPO', 'TRUCHA', 'DORADA', 
'SARDINA', 'ATUN', 'BACALAO', 'ROBALO', 'ANCHOA', 'RAPE'];

let vidas = 5;
let palabraDeLaPartida;

function comenzarJuego() {
    palabraDeLaPartida = seleccionarPalabraDeLaPartida();
    console.log('Palabra seleccionada:', palabraDeLaPartida);
    escribirGuiones(palabraDeLaPartida);
    vidas = 5;
}

function seleccionarLetra(letra) {
    buscarYCompletarPalabra(palabraDeLaPartida, letra);
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
        mesa.appendChild(guion);
    }
}
