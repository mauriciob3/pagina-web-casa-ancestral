const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bebidas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaBebida = document.createElement("div"); // Cambié el nombre de la variable a nuevaBebida
    nuevaBebida.classList = "tarjeta-producto"; // Cambié el nombre de la clase a tarjeta-producto
    nuevaBebida.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Bebida 1"> <!-- Cambié el alt a Bebida -->
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
    contenedorTarjetas.appendChild(nuevaBebida);
    nuevaBebida.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(producto)); // Cambié el nombre de la función de agregarAlCarritoBicicleta a agregarAlCarrito
  });
}

getBebidas().then(bebidas => {
  crearTarjetasProductosInicio(bebidas); // Cambié el parámetro de bebicletas a bebidas
})