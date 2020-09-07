const localStorage = window.localStorage;
let totalCarrito = 0;

// Boton checkout
let checkout = document.querySelectorAll(".link_compra");
checkout.forEach((node) => {
  node.addEventListener("click", (e) => {
    e.preventDefault();
    if (totalCarrito === 0) {
      window.alert("No posee items en su carrito!");
    } else {
      window.location.href = "pago.html";
    }
  });
});

// Boton para vaciar el carrito
const btn_vaciar = document.querySelector("#vaciar");
btn_vaciar.addEventListener("click", () => {
  for (let i = 0; i < listaCarro.length; i++) {
    listaCarro[i].setCantidad(0);
  }
  listaCarro = [];
  tablaCarrito(listaCarro, "carrito");
});

// Alerta que finalizo el proceso
function finalizo(msj) {
  window.alert(msj);
}

class Producto {
  // Crea la clase Producto, que representa un artículo con sus datos
  constructor(img, id, nombre, precio, cantidad) {
    this.img = img;
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
  setCantidad(cant) {
    // Modifica la cantidad de items seleccionados
    this.cantidad = cant;
  }
  getDatos = function () {
    // Genera el HTML para mostrar el listado de todos los productos
    return (
      '<div class="card_container">' +
      '<img class="card_img" src="' +
      this.img +
      '" alt="">' +
      '<div class="text_container"><h3>' +
      this.nombre +
      "</h3>" +
      "<h4> $" +
      this.precio +
      "</h4>" +
      '<button class="btn_compra" data-id="' +
      this.id +
      '">Añadir</button></div></div>'
    );
  };
  getImg = function () {
    return this.img;
  };
  getId = function () {
    return this.id;
  };
  getNombre = function () {
    return this.nombre;
  };
  getPrecio = function () {
    return this.precio;
  };
  getCantidad = function () {
    return this.cantidad;
  };
  getTotal = function () {
    return parseInt(this.precio) * parseInt(this.cantidad);
  };
}
let listado_productos = []; // Creo array vacio

// Cargo los productos disponibles al array
(function cargar_productos() {
  prod1 = new Producto("img/sombrero_clásico.jpg", 0, "Gato Clásico", 200, 0);
  prod2 = new Producto("img/sombrero_dinosaurio.jpg", 1, "Gato Rex", 400, 0);
  prod3 = new Producto("img/sombrero_vintage.jpg", 2, "Gato Vintage", 350, 0);
  prod4 = new Producto("img/sombrero_leon.jpg", 3, "Gato Salvaje", 400, 0);
  prod5 = new Producto("img/sombrero_fiesta.jpg", 4, "Gato de Fiesta", 300, 0);
  prod6 = new Producto(
    "img/sombrero_tejido.jpg",
    5,
    "Gato de Invierno",
    250,
    0
  );
  listado_productos.push(prod1, prod2, prod3, prod4, prod5, prod6);
})();

// Añade al DOM el HTML generado en forma de "li"
function display(array, id) {
  if (array) {
    let htmlid = document.getElementById(id);
    htmlid.innerHTML = "";
    array.forEach(function (i) {
      item = document.createElement("li");
      item.innerHTML = i.getDatos();
      htmlid.appendChild(item);
    });
    // Funcionalidad boton de añadir
    let botones = document.querySelectorAll(".btn_compra");
    botones.forEach((node) => {
      node.addEventListener("click", (e) => {
        e.preventDefault();
        let id = node.getAttribute("data-id");
        addItemToCart(id);
        tablaCarrito(listaCarro, "carrito" /* , finalizo("Item Añadido!") */);
      });
    });
  }
}
display(listado_productos, "list_productos");

let listaCarro = [];
// Traer carrito de localStorage
function loadCart() {
  if (localStorage.getItem("carrito") != null) {
    localStorage.getItem("total", totalCarrito);
    carroStorage = JSON.parse(localStorage.getItem("carrito"));
    totalCarrito = 0;
    for (let i = 0; i < carroStorage.length; i++) {
      listaCarro.push(
        new Producto(
          carroStorage[i].img,
          carroStorage[i].id,
          carroStorage[i].nombre,
          carroStorage[i].precio,
          carroStorage[i].cantidad
        )
      );
    }
  }
  tablaCarrito(listaCarro, "carrito");
}
loadCart();

// Guardar el carrito a localStorage
function saveCart() {
  localStorage.setItem("carrito", JSON.stringify(listaCarro));
  localStorage.setItem("total", totalCarrito);
}

// Agregar al carrito
function addItemToCart(cod) {
  let addItem;
  for (let i = 0; i < listado_productos.length; i++) {
    if (cod == listado_productos[i].id) {
      addItem = listado_productos[i];
      break;
    }
  }
  let pos = -1;
  for (let index = 0; index < listaCarro.length; index++) {
    if (pos === -1) {
      if (listaCarro[index].id == cod) {
        pos = index;
        break;
      }
    } else {
      break;
    }
  }
  if (pos === -1) {
    listaCarro.push(addItem);
    listaCarro[listaCarro.length - 1].cantidad++;
  } else {
    listaCarro[pos].cantidad++;
  }
  saveCart();
}

// Borrar del carrito
function eliminarItem(cod) {
  let ind;
  for (const e of listaCarro) {
    if (e.id === cod) {
      ind = listaCarro.indexOf(e);
      break;
    }
  }
  listaCarro[ind].setCantidad(0);
  listaCarro.splice(ind, ind + 1);
  tablaCarrito(listaCarro, "carrito", finalizo("Item Eliminado!"));
}

// Mostrar Carrito
function tablaCarrito(array, id, callback = undefined) {
  // Añade al DOM el HTML generado en forma de tabla
  const table = document.getElementById(id);
  totalCarrito = 0;
  if (array.length > 0) {
    salida = "";
    array.forEach(function (i) {
      salida +=
        "<tr>" +
        '<td><img src="' +
        i.getImg() +
        '" class = "card_img"/></td>' +
        "<td>" +
        i.getNombre() +
        "</td>" +
        "<td>" +
        i.getCantidad() +
        "</td>" +
        "<td>" +
        '<button class="btn_quitar" data-id="' +
        i.getId() +
        '">X</button>' +
        "</td>" +
        "<td>$" +
        i.getTotal() +
        "</td> </tr>";
      totalCarrito += parseInt(i.getTotal());
    });
    table.innerHTML = salida;
    botones_quitar = document.querySelectorAll(".btn_quitar");
    botones_quitar.forEach((element) => {
      element.addEventListener("click", (e) => {
        let cod = parseInt(element.getAttribute("data-id"));
        e.preventDefault();
        eliminarItem(cod);
      });
    });
  } else {
    table.innerHTML = "<td>No hay nada todavía. ¿Qué esperas?</td>";
  }
  saveCart();
  callback;
}

// Ordenar por precio
function ordenarPrecio(array, desc = false) {
  array.sort(function (a, b) {
    if (desc) {
      return b.precio - a.precio;
    } else {
      return a.precio - b.precio;
    }
  });
}

// Ordenar por nombre
function ordenarNombre(array, desc = false) {
  array.sort(function (a, b) {
    let nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
    let nameB = b.nombre.toUpperCase(); // ignore upper and lowercase

    if (desc) {
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    } else {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    }
  });
}

const orden = document.querySelector("#ordenarpor");
orden.addEventListener("change", (e) => {
  op = orden.value;
  switch (op) {
    case "pr.asc":
      ordenarPrecio(listado_productos);
      break;
    case "pr.dsc":
      ordenarPrecio(listado_productos, true);
      break;
    case "nom.asc":
      ordenarNombre(listado_productos);
      break;
    case "nom.dsc":
      ordenarNombre(listado_productos, true);
      break;
    default:
      break;
  }
  display(listado_productos, "list_productos");
});
