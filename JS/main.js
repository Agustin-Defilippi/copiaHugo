const usuario = document.getElementById("usuario");
const contPadre = document.getElementById("containerPadre");

permitirIngreso();


const datos = JSON.parse(localStorage.getItem('misPedidos')) || []
let stockProductos = JSON.parse(localStorage.getItem('baseDatos')) || [];

let comprobantePedido =1 
console.log(comprobantePedido + "alfin");