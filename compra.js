const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");

//lo comente pq no entiendo pq lista compra me da null.
//cargarEventos();
console.log(listaCompra);

function cargarEventos() {
  document.addEventListener(
    "DOMContentLoaded",
    compra.leerLocalStorageCompra()
  );
}
