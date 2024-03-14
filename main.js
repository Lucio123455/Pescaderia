class Producto {
    constructor(nombre, precio, cantidad, costo, margen, beneficio, ganancia, costoTotal) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.costo = costo; // Puedes definir el costo aquí o ingresarlo manualmente
        this.margen = margen;
        this.beneficio = beneficio;
        this.ganancia = ganancia;
        this.costoTotal = costoTotal;
    }
}

let productos = JSON.parse(localStorage.getItem('productos')) || [];
console.log(productos);


let indice = 0

function agregarProducto() {
    let nombre, cantidad, costo, margen;

    do {
        nombre = prompt("Ingrese el nombre del producto");
    } while (!nombre); // Continuar solicitando el nombre hasta que se ingrese algo

    do {
        cantidad = parseInt(prompt("Ingrese la cantidad del producto, en kilos"));
    } while (isNaN(cantidad) || cantidad <= 0); // Continuar solicitando la cantidad hasta que se ingrese un número válido mayor que cero

    do {
        costo = parseFloat(prompt("Ingrese el costo del producto"));
    } while (isNaN(costo) || costo <= 0); // Continuar solicitando el costo hasta que se ingrese un número válido mayor que cero

    do {
        margen = parseFloat(prompt("Ingrese el margen de ganancia"));
    } while (isNaN(margen) || margen < 0); // Continuar solicitando el margen hasta que se ingrese un número válido

    const beneficio = calcularBeneficio(cantidad, costo, margen);
    const ganancia = calcularGanancia(beneficio, costo, cantidad);
    const precio = calcularPrecio(ganancia, cantidad);
    const costoTotal = cantidad * costo
    const producto = new Producto(nombre, precio, cantidad, costo, margen, beneficio, ganancia, costoTotal, indice);

    indice++
    productos.push(producto);
    productoHtml(nombre, precio, cantidad, costo, margen, beneficio, ganancia, costoTotal, indice); // Aquí se pasan todos los argumentos necesarios
    localStorage.setItem('productos', JSON.stringify(productos));
    actualizarBeneficioTotal()
}





function actualizarBeneficioTotal() {
    const beneficioTotalContent = document.getElementById("beneficio-total");
    let beneficioTotal = 0
    productos.forEach(producto => {
        beneficioTotal += producto.beneficio
    });
    beneficioTotalContent.value = beneficioTotal; // Actualiza el valor del input
    const costosBeneficiosJSON = localStorage.getItem('costosBeneficios');
    const costosBeneficios = JSON.parse(costosBeneficiosJSON);

}

function calcularBeneficio(cantidad, costo, margen) {
    return ((cantidad * costo) * margen) / 100;
}

function calcularGanancia(beneficio, costo, cantidad) {
    return beneficio + costo * cantidad
}

function calcularPrecio(ganancia, cantidad) {
    return ganancia / cantidad
}

function productoHtml(nombre, precio, cantidad, costo, margen, beneficio, ganancia, costoTotal, indice) {
    const listItem = document.createElement('li');

    // Usamos elementos HTML adicionales para mejorar la estructura y la legibilidad del texto
    listItem.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>Precio:</strong> <span class="precio">${precio}</span></p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
        <p><strong>Costo:</strong> ${costo}</p>
        <p><strong>Margen:</strong> %${margen}</p>
        <p><strong>Beneficio:</strong> ${beneficio}</p>
        <p><strong>Ganancia:</strong> <span class="ganancia">${ganancia}</span></p>
        <p><strong>Costo total:</strong> ${costoTotal}</p>
        <button onclick="eliminarProducto(this, ${indice})">Eliminar</button> <!-- Botón para eliminar el producto -->
    `;

    document.getElementById('productos').appendChild(listItem);
}

function eliminarProducto(button, indice) {
    const listItem = button.parentElement;
    listItem.remove(); // Eliminar el elemento <li> que contiene el producto
    productos.splice(indice, 1); // Eliminar el producto del array
    localStorage.setItem('productos', JSON.stringify(productos)); // Actualizar el localStorage
    indice--
    actualizarBeneficioTotal()
}

function borrarDatosCostosBeneficios() {
    let costosBeneficios = {
        luz: 0,
        alquiler: 0,
        margenGanancia: 0,
        costoFijoTotal: 0,
        beneficioObjetivo: 0
    };

    localStorage.setItem('costosBeneficios', JSON.stringify(costosBeneficios));
    
    actualizarCostosBeneficios();
    // Realizar cualquier otra acción necesaria, como actualizar la interfaz de usuario
}


function ingresarCostosFijos() {
    const costosBeneficios = {
        luz: 0,
        alquiler: 0,
        margenGanancia: 0,
        costoFijoTotal: 0,
        beneficioObjetivo: 0
    };

    do {
        costosBeneficios.luz = parseFloat(prompt("Ingrese el costo de la luz"));
    } while (isNaN(costosBeneficios.luz) || costosBeneficios.luz <= 0);

    do {
        costosBeneficios.alquiler = parseFloat(prompt("Ingrese el costo del alquiler"));
    } while (isNaN(costosBeneficios.alquiler) || costosBeneficios.alquiler <= 0);

    do {
        costosBeneficios.margenGanancia = parseFloat(prompt("Ingrese su margen de ganancia"));
    } while (isNaN(costosBeneficios.margenGanancia) || costosBeneficios.margenGanancia <= 0);

    costosBeneficios.costoFijoTotal = costosBeneficios.luz + costosBeneficios.alquiler;

    const costoFijoContent = document.getElementById("costo-fijo");
    costoFijoContent.value = costosBeneficios.costoFijoTotal;

    const beneficioObjetivoContent = document.getElementById("beneficio-objetivo");
    costosBeneficios.beneficioObjetivo = calcularBeneficioObjetivo(costosBeneficios.costoFijoTotal, costosBeneficios.margenGanancia);
    beneficioObjetivoContent.value = costosBeneficios.beneficioObjetivo
    localStorage.setItem('costosBeneficios', JSON.stringify(costosBeneficios));
    console.log(costosBeneficios)
}

function actualizarCostosBeneficios() {
    const costosBeneficiosJSON = localStorage.getItem('costosBeneficios');

    // Convertir la cadena JSON de costosBeneficios de nuevo a un objeto JavaScript
    const costosBeneficios = JSON.parse(costosBeneficiosJSON);

    // Actualizar los elementos HTML con los valores recuperados
    const costoFijoContent = document.getElementById("costo-fijo");
    costoFijoContent.value = costosBeneficios.costoFijoTotal;

    const margenGananciaContent = document.getElementById("beneficio-objetivo");
    margenGananciaContent.value = costosBeneficios.beneficioObjetivo;
}

function calcularBeneficioObjetivo(costoFijoTotal, margenGanancia) {
    return costoFijoTotal + (costoFijoTotal * margenGanancia) / 100
}

function mostrarProductosEnHTML() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    productos.forEach(producto => {
        productoHtml(producto.nombre, producto.precio, producto.cantidad, producto.costo, producto.margen, producto.beneficio, producto.ganancia, producto.costoTotal, producto.indice);
    });
    actualizarBeneficioTotal()
    actualizarCostosBeneficios()
}

window.addEventListener('load', mostrarProductosEnHTML);


function mostrarProductosSeccion() {
    const productosSeccion = document.querySelector('.productosSeccion');
    productosSeccion.style.display = 'block';
    const principal = document.querySelector('.seccion-principal');
    principal.style.display = 'none'
}

// Luego, puedes llamar a esta función desde cualquier lugar de tu código donde sea necesario, por ejemplo:
// mostrarProductosSeccion();
function cerrarProductosSeccion() {
    const productosSeccion = document.querySelector('.productosSeccion');
    productosSeccion.style.display = 'none';
    const principal = document.querySelector('.seccion-principal');
    principal.style.display = 'block'
}

