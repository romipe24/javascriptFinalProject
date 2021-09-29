class Carrito {
  //Añadir producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    //Delegado para agregar al carrito
    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement.parentElement;
      //Enviamos el producto seleccionado para tomar sus datos
      this.leerDatosProducto(producto);
    }
  }

  //Leer datos del producto
  leerDatosProducto(producto) {
    const infoProducto = {
      id: producto.querySelector("button").getAttribute("data-id"),
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h3").textContent,
      precio: producto.querySelector(".precio span").textContent,
      cantidad: 1,
    };
    //comparar si ese producto ya fue agregado al carrito LS o no
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS) {
      if (productoLS.id === infoProducto.id) {
        productosLS = productoLS.id;
      }
    });

    if (productosLS === infoProducto.id) {
      //aca tengo que actualizar elcontador cuando es repetido
      console.log("ya ingresado");
    } else {
      this.insertarCarrito(infoProducto);
    }
  }

  //muestra producto seleccionado en carrito
  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td> ${producto.id} </td>
              <td>
                  <img src="${producto.imagen}" width=100>
              </td>
              <td>${producto.titulo}</td>
              <td>${producto.precio}</td>
              <td> ${producto.cantidad} </td>
              <td>
                  <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
              </td>
          `;

    listaProductos.appendChild(row);
    //guardo en LS
    this.guardarProductosLocalStorage(producto);
  }

  //Eliminar el producto del carrito en el DOM
  eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      //en el producto html use un botton pero en el carrito lo defini que se agregue a la lista como un a
      //tendria que unificar esto
      productoID = producto.querySelector("a").getAttribute("data-id");
      console.log(productoID);
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();
  }

  //Elimina todos los productos
  vaciarCarrito(e) {
    e.preventDefault();
    //mientras haya al menos un elemento en la lista productos
    while (listaProductos.firstChild) {
      //lo remuevo. Si ve otro elemento lo va a remover y asi hasta que no haya nada por el while .
      listaProductos.removeChild(listaProductos.firstChild);
    }
    //borrar del localstorage
    this.vaciarLocalStorage();
    //cuando ya no ecuentra ningun producto termino
    return false;
  }
  //Eliminar todos los datos del LS
  vaciarLocalStorage() {
    localStorage.clear();
  }

  //Almacenar en el LS
  guardarProductosLocalStorage(producto) {
    let productos;
    //Primero me fijo si ya hay elementos y si hay agregar despues del ultimo
    productos = this.obtenerProductosLocalStorage();
    //Agregar el producto al array
    productos.push(producto);
    //Agregamos al LS
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  //Comprobar que hay elementos en el LS
  obtenerProductosLocalStorage() {
    let productoLS;

    //Comprobar si hay algo en LS
    if (localStorage.getItem("productos") === null) {
      //si no hay nada creo un array vacio
      productoLS = [];
    } else {
      //si hay algo lo guardo
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  //Eliminar producto por ID del LS
  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    //Obtenemos el array de productos
    productosLS = this.obtenerProductosLocalStorage();
    //Comparar el id del producto borrado con LS
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        //si es igual lo borro
        productosLS.splice(index, 1);
      }
    });
    //Actualizo el array del LS
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  //Mostrar los productos guardados en el LS
  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      //Construir plantilla
      const row = document.createElement("tr");
      row.innerHTML = `
      <td> ${producto.id} </td>
    <td>
        <img src="${producto.imagen}" width=100>
    </td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td> ${producto.cantidad} </td>
    <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>
    `;
      listaProductos.appendChild(row);
    });
  }

  //Procesar pedido
  procesarPedido(e) {
    e.preventDefault();
    //si el carrito esta vacio
    if (this.obtenerProductosLocalStorage().length === 0) {
      //cambiar por un alert
      console.log("El carrito esta vacio");
    } else {
      location.href = "carrito.html";
    }
  }

  // Mostrar los productos guardados en el LS en carrito.html
  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      //Construir plantilla
      const row = document.createElement("tr");
      row.innerHTML = `
    <td> ${producto.id} </td>
    <td>
        <img src="${producto.imagen}" width=100>
    </td>
    <td>${producto.titulo}</td>
    <td>
      <input type= "number" class = "form-control cantidad" min= "1" value = ${producto.cantidad}>
     </td>
     <td>${producto.precio} </td>
     <td>${producto.precio} * ${producto.cantidad}</td>
    <td>
        <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
    </td>
    `;
      listaCompra.appendChild(row);
    });
  }

  // lo comento pq listacompra me da null

  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td> ${producto.id}</td>
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${
                      producto.cantidad
                    }>
                </td>
                <td>${producto.precio}</td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${
                      producto.id
                    }"></a>
                </td>
            `;
      listaCompra.appendChild(row);
    });
  }

  //Calcular montos
  calcularTotal() {
    let productosLS;
    let total = 0,
      iva = 0,
      subtotal = 0;
    productosLS = this.obtenerProductosLocalStorage();
    for (let i = 0; i < productosLS.length; i++) {
      let element = Number(productosLS[i].precio * productosLS[i].cantidad);
      total = total + element;
    }
    //tofixed es para decimales
    iva = parseFloat(total * 0.22).toFixed(2);
    subtotal = parseFloat(total - iva).toFixed(2);

    document.getElementById("subtotal").innerHTML = "$ " + subtotal;
    document.getElementById("igv").innerHTML = "$ " + iva;
    document.getElementById("total").value = "$ " + total.toFixed(2);
  }
}
