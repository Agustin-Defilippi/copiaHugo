const usuario = document.getElementById("usuario");
const contPadre = document.getElementById("containerPadre");

permitirIngreso();


const datos = JSON.parse(localStorage.getItem('misPedidos')) || []
let stockProductos = JSON.parse(localStorage.getItem('baseDatos')) || [];
const pedidosGuardados = JSON.parse(localStorage.getItem('guardarPedidos')) ||[] ;

let comprobantePedido =1 
console.log(comprobantePedido + "alfin");
