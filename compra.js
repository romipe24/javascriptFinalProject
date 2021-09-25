const compra = new Carrito();
const listaCompra = document.querySelector("#lista-Compra  tbody");
const carrito = document.getElementById("carrito");
const procesarCompraBtn = document.getElementById("procesar-compra");
const cliente = document.getElementById("cliente");
const correo = document.getElementById("correo");

cargarEventos();
// console.log(carrito2);

function cargarEventos() {
  document.addEventListener(
    "DOMContentLoaded",
    compra.leerLocalStorageCompra()
  );

  carrito.addEventListener("click", (e) => {
    compra.eliminarProducto(e);
  });

  compra.calcularTotal();

  procesarCompraBtn.addEventListener("click", procesarCompra);
}

//para chequiar
function hola() {
  console.log("hola");
}

function procesarCompra(e) {
  e.preventDefault();

  if (compra.obtenerProductosLocalStorage().length === 0) {
    console.log("no hay productos. Seleccione alguno");
    function irAProductos() {
      //lleva por defecto a la pagina
      window.location = "Productos.html";
    }
    irAProductos();
  } else if (cliente.value === "" || correo.value === "") {
    console.log("Ingrese todos los campos requeridos");
    //
    //return false;
  } else {
    const cargandoGif = document.querySelector("#cargando");
    cargandoGif.style.display = "block";

    const enviado = document.createElement("img");
    enviado.src = "imagenes/iconos compra/mail.gif";
    enviado.style.display = "block";
    enviado.width = "150";

    setTimeout(() => {
      cargandoGif.style.display = "none";
      document.querySelector("#loaders").appendChild(enviado);
      setTimeout(() => {
        compra.vaciarLocalStorage();
        enviado.remove();
        window.location = "productos.html";
      }, 2000);
    }, 2000);
  }
}
