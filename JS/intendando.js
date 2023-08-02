const btnCalcularProductos = () =>{
    const btnCalcular = document.getElementById("btn-calcularProductos");
    
    const containerButtons = document.getElementById("cargaProductos");

    btnCalcular.addEventListener("click", () =>{
        contPadre.innerHTML = renderContPadre();
        agregarCampoOnClick1();
        enviarPedido();
        volverAtrasCalcularProducto();
        terminarCargaProducto1();
        containerButtons.innerHTML = "";
        containerButtons.className= "heigth-0"
    })
}


//Funcion render del contenedor Padre del Programa
const renderContPadre = () => {
    return `
     <div class="containerPrograma">
         <div class="containerForm1">
             <h1>PROGRAMA MERCADERIA HUGO</h1>
             <div class="containerForm2">
                 <div class="containerForm">
                     <div class="form">
                         <div class="mb-3 mercaderia">
                            <label class="mb-2"><b>Ingrese Nombre y apellido Cliente</b></label>
                            <input type="text" id="nombreDestinatario" placeholder="nombre" class="input-class mb-3">
 
                            <div class="containerPedido">
                                <h2>Realizar Pedidos</h2>   
                                <form class="form1" id="formStock1">
                                    <div id="formElements1" class="my-3">
                                     
                                    </div>
                                    <div class="my-2 botonesCargar">
                                        <button id="btn-pedido" type="button" class="btn bg-dark border border-warning text-warning">Producto(+)</button>
                                        <button type="submit" class="btn bg-dark text-warning border border-warning text-warning">Enviar(+)</button>
                                        <button id="btn-terminar1" type="button" class="btn bg-dark text-warning border border-warning text-warning">Resetear</button>
                                    </div>
                                </form>
                            </div>       
                         </div>
                     </div>
                 </div>
             </div>

             
         </div>
         <div id="mercaderia" class="mercaderiaDefinida"></div>
         <div class="containerTotal">
             <div class="total" id="casillasTotalLista">
                 
             </div>
             <div class="total" id="casillasTotalNeto">
                 
             </div>
         </div>
         <div class="mb-2 cont-btnFinalizar" id="cont-btnFinalizar">
             
         </div>
     </div>
     <div class="btn-volver border border-ligth">
         <button id="btn-volverAtras"class="btn bg-warning">Volver</button>
     </div>`;
    
};

const crearElementosPedidos = () => {
    const formElementsDiv1 = document.getElementById('formElements1');
    
    const nuevoProductoDiv1 = document.createElement('div');
    nuevoProductoDiv1.className = "border border-warning my-2"

    const nombreInput1 = document.createElement('input');
    nombreInput1.type = 'text';
    nombreInput1.placeholder = 'Nombre del producto';
    nombreInput1.className="m-2";
  
    const precioInput1 = document.createElement('input');
    precioInput1.type = 'number';
    precioInput1.placeholder = 'Precio';
    precioInput1.className="m-2";
    
  
    const categoriaInput1 = document.createElement('input');
    categoriaInput1.type = 'text';
    categoriaInput1.placeholder = 'Categoria';
    categoriaInput1.className="m-2";
  
    const unidadesInput1 = document.createElement('input');
    unidadesInput1.type = 'number';
    unidadesInput1.placeholder = 'Unidades';
    unidadesInput1.className="m-2";

    const inputDescuento = document.createElement('input');
    inputDescuento.type = 'text';
    inputDescuento.placeholder = 'Descuento Producto';
    inputDescuento.className="m-2";
  
    nuevoProductoDiv1.appendChild(nombreInput1);
    nuevoProductoDiv1.appendChild(precioInput1);
    nuevoProductoDiv1.appendChild(categoriaInput1);
    nuevoProductoDiv1.appendChild(unidadesInput1);
    nuevoProductoDiv1.appendChild(inputDescuento);
    formElementsDiv1.appendChild(nuevoProductoDiv1);
}

// Función para CARGAR el formulario de stock
const renderFormStock1 = () => {

    const nomb = document.getElementById("nombreDestinatario").value
    if(nomb !== "" && isNaN(nomb)){
        crearElementosPedidos();
    }else{
        console.log("ingresa un nombre de cliente si o si");
    }
 
};

// Funcion eventica para renderizar el formulario infinito
const agregarCampoOnClick1 = () => {
    const botonAgregarCampo1 = document.getElementById('btn-pedido');
    
    botonAgregarCampo1.addEventListener('click',
     renderFormStock1
   );
}

const enviarPedido = () =>{
    const formStock1 = document.getElementById("formStock1");
    
    formStock1.addEventListener("submit", (e) => {
    e.preventDefault();
    procesarFormulario1();
    formStock1.reset();
    
    const numeroComprobante = comprobantePedido;
    comprobantePedido++;
    console.log("Número de comprobante:", numeroComprobante);
 });
}

const procesarFormulario1 = () => {
    const formElements1 = document.getElementById('formElements1').children;
    const nombreCliente = document.getElementById("nombreDestinatario").value.toUpperCase();
    let contadorID = 1
   
    // Iteramos sobre los elementos del formulario
    for (const productoDiv of formElements1){
      const nombreProducto = productoDiv.children[0].value.trim().toUpperCase();
      const precioProducto = parseFloat(productoDiv.children[1].value);
      const categoriaProducto = productoDiv.children[2].value;
      const unidadesProducto = parseInt(productoDiv.children[3].value);
      const descuentoProducto = parseInt(productoDiv.children[4].value);
  
      const producto1 = {
        id: contadorID,
        nombreCliente: nombreCliente,
        nombreProducto,
        precioProducto,
        categoriaProducto,
        unidadesProducto,
        descuentoProducto
      };

      if(nombreProducto !== "" &&
        precioProducto !== "" &&
        categoriaProducto !== "" && 
        unidadesProducto !== "" &&
        descuentoProducto !== ""){
            datos.push(producto1);
            console.log(datos);
        }else{
            console.log("Debes realizar este pedido para enviar");
        }
      contadorID++;

    }
   localStorage.setItem("misPedidos",JSON.stringify(datos));
};

const terminarCargaProducto1 = () =>{
    const btnTerminar1 = document.getElementById("btn-terminar1");
    const formElements1 = document.getElementById("formElements1");

    btnTerminar1.addEventListener("click", () =>{
        formElements1.innerHTML="";
        console.log(datos);
        agregarCampoOnClick1();
        datos.length = 0
        console.log(datos);
    })
}

// Funcion volver atras calcular producto
const volverAtrasCalcularProducto = () =>{
    const btnVolver = document.getElementById("btn-volverAtras");
    const containerPadre = document.getElementById("containerPadre");
    const cargarOcalcular = document.getElementById("cargaProductos");
    btnVolver.addEventListener("click", () =>{
        containerPadre.innerHTML="";
        cargarOcalcular.className="containerCargarOcalcular"
        renderContButtonsEleccion();
        btnCargarProductos();
        btnCalcularProductos();
        btnBaseDatos();
        btnCargarPedidos();
    })
}