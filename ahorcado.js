const palabrasPosibles = ['SALMON', 'MERLUZA', 'HIPOCAMPO', 'TRUCHA', 'DORADA',
    'SARDINA', 'ATUN', 'BACALAO', 'ROBALO', 'ANCHOA', 'RAPE', 'PULPO', 'CANGREJO',
    'LANGOSTA', 'MEJILLON', 'CALAMAR', 'CAMARON', 'CABALLA', 'TIBURON', 'PEZ ESPADA',
    'LUBINA', 'OSTRA', 'ANGUILA', 'CARPA', 'BESUGO', 'BARRACUDA', 'PEZ GLOBO', 'SALMONETE',
    'BALLENA', 'FOCA', 'ESTRELLA DE MAR', 'JUREL', 'BROTE', 'LENGUADO'];


let vidas = 6;
let palabraDeLaPartida;
let juego

function comenzarJuego() {
    palabraDeLaPartida = seleccionarPalabraDeLaPartida();
    console.log('Palabra seleccionada:', palabraDeLaPartida);
    escribirGuiones(palabraDeLaPartida);
    vidas = 6;
    juegoIniciado = true
    const vidasElemento = document.getElementById("vidas");
    vidasElemento.innerHTML = ""; // Limpiar el contenido existente
    const img = document.createElement("img");
    img.src = 'vida6.png'; // Reemplaza "URL_DE_LA_IMAGEN" con la URL de la imagen de ahorcado
    img.alt = "Vida perdida";
    img.style.width = "auto"; // Establecer el ancho de la imagen
    img.style.height = "160px"; // Establecer la altura de la imagen
    vidasElemento.appendChild(img);
    mostrarTodasLasLetras()
}

function seleccionarLetra(letra) {
    if (juegoIniciado === true) {
        buscarYCompletarPalabra(palabraDeLaPartida, letra);
        revisarSiGanaste()
        sacarLetra(letra)
    }
}

function mostrarTodasLasLetras() {
    const botones = document.querySelectorAll('#tablero button');
    botones.forEach(boton => {
        boton.style.display = 'inline-block';
    });
}

function sacarLetra(letra) {
    const botones = document.getElementsByClassName(`${letra}`);
    if (botones.length > 0) {
        for (let i = 0; i < botones.length; i++) {
            botones[i].style.display = 'none';
        }
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

    dibujarAhorcado()
}

function dibujarAhorcado() {
    const vidasElemento = document.getElementById("vidas");
    vidasElemento.innerHTML = ""; // Limpiar el contenido existente
    let urlAhorcado

    for (let i = 0; i <= vidas; i++) {
        if (vidas === i) {
            urlAhorcado = `vida${i}.png`
        }
    }

    const img = document.createElement("img");
    img.src = urlAhorcado; // Reemplaza "URL_DE_LA_IMAGEN" con la URL de la imagen de ahorcado
    img.alt = "Vida perdida";
    img.style.width = "auto"; // Establecer el ancho de la imagen
    img.style.height = "160px"; // Establecer la altura de la imagen
    vidasElemento.appendChild(img);
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
        if (palabraDeLaPartida[i] === " ") {
            guion.textContent = "/"; // Agregar espacio en lugar de guión
        } else {
            guion.textContent = "_ ";
        }
        guion.style.fontSize = "70px";
        mesa.appendChild(guion);
    }
}

