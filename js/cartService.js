const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  // Reviso si el producto está en el carrito.
  let memoria = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  let cantidadProductoFinal;
  // Si no hay localstorage lo creo
  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("bebidas", JSON.stringify([nuevoProducto])); // Cambié el nombre del almacenamiento local a "bebidas"
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  } else {
    // Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoria.findIndex(bebida => bebida.id === producto.id); // Cambié el nombre de las variables a bebida
    const nuevaMemoria = memoria;
    // Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      // Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("bebidas", JSON.stringify(nuevaMemoria)); // Cambié el nombre del almacenamiento local a "bebidas"
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoria = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(bebida => bebida.id === producto.id); // Cambié el nombre de las variables a bebida
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1);
  }
  localStorage.setItem("bebidas", JSON.stringify(nuevaMemoria)); // Cambié el nombre del almacenamiento local a "bebidas"
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem("bebidas")); // Cambié el nombre del almacenamiento local a "bebidas"
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("bebidas"); // Cambié el nombre del almacenamiento local a "bebidas"
  actualizarNumeroCarrito();
}

actualizarNumeroCarrito();
