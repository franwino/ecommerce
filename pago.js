const localStorage = window.localStorage;

//traemos el total del localstorage
const total = document.getElementById("total");
totalGuardado = localStorage.getItem("total");
total.innerHTML = totalGuardado;



//tomamos los elementos html y los traemos a variables de js
let btnContinue = document.getElementById("btn-continue");
let userValues = document.getElementsByClassName("user-data");
let listado = document.getElementById("user-data-msj");
let checking = document.getElementsByClassName("check");
let toggleDiv = document.getElementById("toggle");

//escribimos los datos del usuario en pantalla
function escribe(user) {
  let campo = "<span>" + user.name + ": </span>";
  let valor = "<span>" + user.value + "</span>";
  let nodo = document.createElement("li");
  nodo.innerHTML = campo + valor + "\n";
  listado.appendChild(nodo);
  }

//corroboramos qué eligió en opciones de pago
let checked = (checking) => {
    for(i=0; i<checking.length;i++){
  if(checking[i].checked){
      return checking[i].value;
      }
  }
}

//tomamos los datos del usuario, convertimos en array y lo mandamos a la pantalla
  btnContinue.addEventListener("click", (e)=> {
    e.preventDefault()

    //muestro esta sección del formulario
    toggleDiv.classList.toggle("invisible");

    //envío datos a la pantalla
    listado.innerHTML = "";
    Array.prototype.forEach.call(userValues, (user)=> {
      escribe(user);
    })
    
  })

//pago con tarjeta de crédito
    function myFunction() {
        var x = document.getElementById("payment-form");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }




