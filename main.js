class Producto {
    constructor(nombre, precio, cantidad, costo, margen,beneficio,ganancia,costoTotal) {
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

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto");
    const cantidad = parseInt(prompt("Ingrese la cantidad del producto, en kilos"));
    const costo = parseFloat(prompt("Ingrese el costo del producto"));
    const margen = parseFloat(prompt("Ingrese el margen de ganancia"));

    const beneficio = calcularBeneficio(cantidad, costo, margen);
    const ganancia = calcularGanancia(beneficio, costo, cantidad);
    const precio = calcularPrecio(ganancia, cantidad);
    const costoTotal = cantidad * costo
    const producto = new Producto(nombre, precio, cantidad, costo, margen, beneficio, ganancia,costoTotal);
    
    if (nombre !== null) {
        productos.push(producto);
        productoHtml(nombre, cantidad, costo, margen, precio, beneficio, ganancia,costoTotal); // Aquí se pasan todos los argumentos necesarios
        localStorage.setItem('productos', JSON.stringify(productos));
    } else {
        alert("Ingrese un nombre valido")
    }
    
}


function calcularBeneficio(cantidad,costo,margen){
    return ((cantidad * costo) * margen) /100;
}

function calcularGanancia(beneficio,costo,cantidad){
    return beneficio + costo * cantidad
}

function calcularPrecio(ganancia,cantidad){
    return ganancia / cantidad 
}

function productoHtml(nombre, cantidad, costo, margen, precio, beneficio, ganancia, costoTotal, indice) {
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
}

function mostrarProductosEnHTML() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    productos.forEach(producto => {
        productoHtml(producto.nombre, producto.precio, producto.cantidad, producto.costo, producto.margen, producto.beneficio, producto.ganancia, producto.costoTotal);
    });
}

window.addEventListener('load', mostrarProductosEnHTML);
