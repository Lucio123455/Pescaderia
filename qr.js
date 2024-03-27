class QR {
    constructor(producto, descuento, dia, link, codigoURL) {
        this.producto = producto;
        this.descuento = descuento;
        this.dia = dia;
        this.link = link;
        this.codigoURL = codigoURL; // Agregar la propiedad para almacenar la URL de la imagen del código QR
    }
}

let QRS = JSON.parse(localStorage.getItem('QRS')) || [];
let dias = ['martes', 'miercoles', 'jueves', 'viernes'];

function generarQR() {
    const producto = document.getElementById('producto').value;
    const descuento = document.getElementById('porcentaje').value;
    const dia = document.getElementById('dia').value;

    // Verificar que todos los campos tengan un valor
    if (producto && descuento && dia) {
        const link = generarLink(dia);

        const nuevoQR = new QR(producto, descuento, dia, link, null); // Inicializar la propiedad codigoURL con null

        const codigo = new QRCode(contenedorQR);
        codigo.makeCode(link);

        // Obtener la URL de la imagen del código QR después de un breve retraso
        setTimeout(() => {
            const codigoURL = contenedorQR.querySelector('img').src;
            nuevoQR.codigoURL = codigoURL; // Asignar la URL de la imagen del código QR a la propiedad codigoURL

            QRS.push(nuevoQR); // Guardar el nuevo QR en el arreglo QRS
            localStorage.setItem('QRS', JSON.stringify(QRS)); // Guardar el arreglo QRS en el localStorage
            crearDescuento(dia); // Mostrar el cartel para el nuevo QR
            location.reload();
        }, 500); // Esperar 500 milisegundos (ajusta este valor según sea necesario)
    } else {
        alert('Por favor, completa todos los campos antes de generar el código QR.');
    }
    

}

function generarLink(dia) {
    return "https://lucio123455.github.io/Pescaderia/qr.html#" + dia;
}

function crearDescuento(dia) {
    const cartel = document.getElementById(`${dia}`);
    cartel.classList.add('cartel');


    // Invertimos el arreglo QRS para buscar del más nuevo al más viejo
    const qrEncontrado = QRS.slice().reverse().find(qr => qr.dia === dia);

    if (qrEncontrado) {
        const contenidoCartel = `
            <p>Producto: ${qrEncontrado.producto}</p>
            <p>Descuento: ${qrEncontrado.descuento}</p>
            <p>Día: ${qrEncontrado.dia}</p>
            <img id="" src="${qrEncontrado.codigoURL}" alt="">
        `;
        cartel.innerHTML = contenidoCartel;
    }
}

function mostrarCarteles() {
    for (let i = QRS.length - 1; i >= 0; i--) {
        const qr = QRS[i];
        crearDescuento(qr.dia);
    }
}

function borrarItemLocalStorage(clave) {
    localStorage.removeItem(clave);
    location.reload();
}

mostrarCarteles()








