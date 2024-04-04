const contenedorTarjetas = document.getElementById("cart-container"); // Cambié el nombre del contenedor a "cart-container"
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */
function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevaBebida = document.createElement("div"); // Cambié el nombre de la variable a nuevaBebida
      nuevaBebida.classList = "tarjeta-producto"; // Cambié el nombre de la clase a tarjeta-producto
      nuevaBebida.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Bebida 1"> <!-- Cambié el alt a Bebida -->
    <h3>${producto.nombre}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevaBebida);
      nuevaBebida
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearTarjetasProductosCarrito();
          actualizarTotales();
        });
      nuevaBebida
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  carritoVacioElement.classList.toggle("escondido", productos); // Cambié el nombre del elemento a carrito-vacio
  totalesContainer.classList.toggle("escondido", !productos);
}


document.getElementById("comprar").addEventListener("click", async () => {
  const carrito = JSON.parse(localStorage.getItem("bebidas")); // Corregido el nombre de la clave localStorage
  if (carrito && carrito.length > 0) {
    const res = await fetch("http://localhost:4000/carrito/comprar", {
      method: "POST",
      body: JSON.stringify(carrito),
      headers: { // Corregido a minúsculas
        "content-type": "application/json" // Corregido el nombre del encabezado
      }
    });
    if (res.ok) {
      reiniciarCarrito(); // Corregido el nombre de la función
      window.location.href = "http://127.0.0.1:5500/compra-exitosa.html";
    }
  }
});
 