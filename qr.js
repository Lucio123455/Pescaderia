class QR {
    constructor(producto, descuento, dia, link) {
        this.producto = producto;
        this.descuento = descuento;
        this.dia = dia;
        this.link = link;
    }
}

let QRS = JSON.parse(localStorage.getItem('QRS')) || [];
let dias = ['martes', 'miercoles', 'jueves' , 'viernes']

function generarQR() {
    const producto = document.getElementById('producto').value;
    const descuento = document.getElementById('porcentaje').value;
    const dia = document.getElementById('dia').value;
    
    // Verificar que todos los campos tengan un valor
    if (producto && descuento && dia) {
        const link = generarLink(dia);
        
        const nuevoQR = new QR(producto, descuento, dia, link);
        
        const codigo = new QRCode(contenedorQR);
        codigo.makeCode(link);

        QRS.push(nuevoQR);
        
        localStorage.setItem('QRS', JSON.stringify(QRS));
        crearDescuento(dia);
    } else {
        alert('Por favor, completa todos los campos antes de generar el código QR.');
    }
}


function generarLink(dia) {
    return "http://127.0.0.1:5500/qr.html#" + dia;
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
            <p>Enlace: <a href="${qrEncontrado.link}">${qrEncontrado.link}</a></p>
        `;
        cartel.innerHTML = contenidoCartel;
    } 
}



function mostrarCarteles(){
    for (let i = 0; i < QRS.length; i++) {
        crearDescuento(dias[i])
    }
}

mostrarCarteles()

function copiarCodigoQR() {
    const contenedorQR = document.getElementById('contenedorQR');
    const imagenQR = contenedorQR.querySelector('img');
    
    if (imagenQR) {
        // Crear un área de texto temporal para copiar la URL de la imagen
        const areaTexto = document.createElement('textarea');
        areaTexto.value = imagenQR.src;
        document.body.appendChild(areaTexto);
        
        // Seleccionar y copiar el contenido del área de texto al portapapeles
        areaTexto.select();
        document.execCommand('copy');
        
        // Eliminar el área de texto temporal
        document.body.removeChild(areaTexto);
        
        // Informar al usuario que se ha copiado la imagen
        alert('La imagen del código QR se ha copiado al portapapeles.');
    } else {
        alert('No se encontró el código QR.');
    }
}






