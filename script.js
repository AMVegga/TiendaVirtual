document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito(); // Mostrar número de productos en index.html
    mostrarCarrito(); // Para carrito.html
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    actualizarContadorCarrito(); // 🛒 Actualiza el contador en index.html
    alert(`${nombre} agregado al carrito.`);
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = carrito.length; // Muestra la cantidad de productos
    }
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    if (listaCarrito) {
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            let item = document.createElement("li");
            item.textContent = `${producto.nombre} - $${producto.precio}`;
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = () => {
                carrito.splice(index, 1);
                actualizarCarrito();
                mostrarCarrito();
            };
            item.appendChild(botonEliminar);
            listaCarrito.appendChild(item);
            total += Number(producto.precio);
        });

        totalElemento.textContent = total;
    }
}

// Evento para vaciar el carrito
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("vaciar-carrito")) {
        document.getElementById("vaciar-carrito").addEventListener("click", () => {
            carrito = [];
            actualizarCarrito();
            mostrarCarrito();
        });
    }
    mostrarCarrito();
});

// Evento para agregar productos desde productos.html
document.querySelectorAll(".agregar-carrito").forEach((boton) => {
    boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = boton.dataset.precio;
        agregarAlCarrito(nombre, precio);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarTotalPaypal();
});

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || []; // Si no hay carrito, devuelve un array vacío
}

function actualizarTotalPaypal() {
    let total = calcularTotalCarrito();

    // Actualiza el texto del total en la página
    document.getElementById("total-carrito").textContent = `$${total}`;

    // Actualiza el campo hidden de PayPal con el total correcto
    document.getElementById("paypal-amount").value = total;
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let carrito = obtenerCarrito();
    let total = carrito.reduce((sum, producto) => {
        let precio = parseFloat(producto.precio) || 0; // Asegura que sea número
        let cantidad = parseInt(producto.cantidad) || 1; // Asegura que sea número
        return sum + (precio * cantidad);
    }, 0);
    return total.toFixed(2); // Redondea a 2 decimales
}

// Función para actualizar el total en PayPal
function actualizarTotalPaypal() {
    let total = calcularTotalCarrito();

    // Mostrar el total en la página
    document.getElementById("total-carrito").textContent = `$${total}`;

    // Actualizar el valor en el formulario de PayPal
    document.getElementById("paypal-amount").value = total;
}