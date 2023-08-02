btnCargarPedidos = () =>{
    const containerButtons = document.getElementById("cargaProductos");
    const btnMisPedidos = document.getElementById("btn-misPedidos");

    btnMisPedidos.addEventListener("click", () =>{
        renderMisPedidos()
       
        containerButtons.innerHTML = "";
        containerButtons.className= "heigth-0"
    })
}

// Funcion volver atras cargar producto
const volverAtrasMisPedidos= () =>{
    const btnVolver4 = document.getElementById("btn-volverAtras4");
    const containerPrograma2 = document.getElementById("contMisPedidos");
    const cargarOcalcular = document.getElementById("cargaProductos");
    btnVolver4.addEventListener("click", () =>{
        containerPrograma2.innerHTML="";
        cargarOcalcular.className="containerCargarOcalcular"
        renderContButtonsEleccion();
        btnBaseDatos();
        btnCargarProductos();
        btnCalcularProductos();
        btnCargarPedidos()
    })
}

const renderMisPedidos = () =>{
    const contMisPedidos = document.getElementById("contMisPedidos");

    contMisPedidos.innerHTML= `
    <div  class="containerPrograma4" id="containerPrograma4">
      <div  class="containerForm4">
        <div id="misPedidosPdf" class="containerForm4">
          <h1>MIS PEDIDOS</h1>
          <div class="containerForm7">

            <div class="cont-input-cliente">

              <label class="mb-2"><b>Ingrese Nombre Cliente</b></label>
              <input type="text" id="clienteNombre" placeholder="nombre" class="input-class mb-3">

              <label class="mb-2"><b>Ingrese numero pedido</b></label>
              <input type="number" id="posicionPedido" placeholder="numero Pedido" class="input-class mb-3">

            </div>

            <div id="contenedores"class="containerForm8 pdf-style" id="misPdf table table-striped">

            
            </div>
          </div>
        </div>
    
        <div class="btn-resetBase">
          <button id="btn-pdf"class="btn bg-danger text-light" type="button">Descargar PDF</button>
        </div>
      </div>
    </div>
    <div class="btn-volver4 border border-ligth">
      <button id="btn-volverAtras4"class="btn bg-warning">Volver</button>
    </div>`
  


   volverAtrasMisPedidos()
   renderContenedores()

      const btnPdf = document.getElementById("btn-pdf")

      btnPdf.addEventListener("click", () =>{
        Toastify({

          text: "PDF DESCARGADO, ENCUENTRALO EN LA CARPETA DESCARGAS!",
          backgroundColor:"red",
          textColor:"black",
          duration: 3000, 
          gravity: "bottom", 
          position: "center",
          style: {
            color:"white",
          },
          
        }).showToast();

        setTimeout(() => {
          descargarPDF("misPedidosPdf"); 
        }, 3000);
      
      })  
}

const renderContenedores = () =>{
  const contenedores = document.getElementById("contenedores");
  
  const inputNombreCliente = document.getElementById("clienteNombre");

  inputNombreCliente.addEventListener("change", () =>{
    contenedores.innerHTML = `
  <table    class="table table-striped border border-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Producto</th>
        <th scope="col">Unidades</th>
        <th scope="col">Precio</th>
        <th scope="col">Precio S/IVA</th>
        <th scope="col">IVA</th>
        <th scope="col">Bonificacion</th>
        <th scope="col">SubTotal</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody id="misPedidos" class="w-100">

    </tbody>
  </table>`
  renderizarPedido();
  })
  
 
}


const renderizarPedido = () => {
  const pedidos = datos;
  console.log(pedidos);
  const inputNombreCliente = document.getElementById("clienteNombre");
  const inputPosicion = document.getElementById("posicionPedido");
  const misPedidos = document.getElementById("misPedidos");

  const arrayFiltradoCliente = pedidos.filter(item => item.nombreCliente === inputNombreCliente.value.trim().toUpperCase());

  console.log(arrayFiltradoCliente);
  // Limpiamos los resultados anteriores antes de mostrar los nuevos
  misPedidos.innerHTML = '';

  arrayFiltradoCliente.forEach((item, i) => {
    // Renderizamos los pedidos filtrados por nombre de cliente
    let PrecioSinIVA =(item.precioProducto / 1.21).toFixed(2)
    const contenedorMisPedidos = document.createElement("tr");
    contenedorMisPedidos.innerHTML = `
      <td>${i}</td>
      <td>${item.id}</td>
      <td>${item.nombreProducto}</td>
      <td>${item.unidadesProducto}</td>
      <td>$${item.precioProducto} ARS</td>
      <td>$${PrecioSinIVA} ARS</td>
      <td>${(item.precioProducto - PrecioSinIVA).toFixed(2)}</td>
      <td>%${item.descuentoProducto}</td>
      <td>$${item.precioProducto * item.unidadesProducto} ARS</td>
      <td>$${calcularDescuentos(item.precioProducto,item.descuentoProducto)* item.unidadesProducto} ARS</td>
  
    `;
    misPedidos.appendChild(contenedorMisPedidos);
  });

  inputPosicion.addEventListener("change", () => {
    // Obtenemos el valor de posición seleccionado
    const posicionSeleccionada = parseInt(inputPosicion.value, 10);
  
    // Validamos que el valor ingresado sea un número válido
    if (isNaN(posicionSeleccionada)) {
      console.log("Ingrese un número válido de posición.");
      return;
    }
  
    // Filtramos el array por la posición seleccionada
    const arrayFiltradoPorPosicion = arrayFiltradoCliente.filter((item, index) => index === posicionSeleccionada);
  
    // Limpiamos los resultados anteriores antes de mostrar los nuevos
    misPedidos.innerHTML = '';
  
    arrayFiltradoPorPosicion.forEach((elemento, i) => {
      // Renderizamos los pedidos filtrados por posición
      const contenedorPepe = document.createElement("tr");
      contenedorPepe.innerHTML = `
        
        <td>${elemento.id}</td>
        <td>${elemento.nombre}</td>
        <td>${elemento.unidades}</td>
        <td>$${elemento.precio} ARS</td>
        <td>%${elemento.descuento}</td>
        <td>$${elemento.precio * elemento.unidades} ARS</td>
        <td>$${calcularDescuentos(elemento.precio, elemento.descuento) * elemento.unidades} ARS</td>
      `;
      misPedidos.appendChild(contenedorPepe);
    });
  });
  
}

const calcularDescuentos = (precioProducto,porcentajeDescuento) =>{
  const descuento = (precioProducto * porcentajeDescuento) / 100;
  const precioConDescuento = precioProducto - descuento;
  return (precioConDescuento).toFixed(2);
}

// Función para generar y descargar el PDF
const descargarPDF = (x) => {
    const element = document.getElementById(x); // Reemplaza "contenido" con el ID del contenedor que contiene los datos a convertir
  
    // Configuración opcional para el tamaño y orientación del PDF
    const options = {
      margin: 15,
      filename: "PedidosHUGO.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2,className:"pdf-style"},
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      
    };

    // Utilizar html2pdf.js para generar el PDF
    html2pdf().from(element).set(options).save();
}; 
   

/* const descargarPDF = (className) => {
  // Crear una copia del contenido para no modificar el HTML original
  const element = document.createElement("div");
  const originalContent = document.getElementsByClassName(className);

  for (let i = 0; i < originalContent.length; i++) {
    const clonedNode = originalContent[i].cloneNode(true);
    element.appendChild(clonedNode);
  }

  // Configuración opcional para el tamaño y orientación del PDF
  const options = {
    margin: 15,
    filename: "PedidosHUGO.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2},
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Aplicar estilos en línea a los elementos clonados
  const elements = element.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].style.color = "black";
    elements[i].style.fontSize = "20px";
    elements[i].style.border = "black solid 2px";
    elements[i].style.fontFamily = "'Times New Roman', Times, serif";
   
    // Agrega más estilos según sea necesario
  }

  // Utilizar html2pdf.js para generar el PDF
  html2pdf().from(element).set(options).save();
}; */

/* 
contMisPedidos.innerHTML= `<div  class="containerPrograma4" id="containerPrograma4">
<div  class="containerForm4">
  <div id="misPedidosPdf" class="containerForm4">
    <h1>MIS PEDIDOS</h1>
    <div class="containerForm7">
      
      <div class="containerForm8 pdf-style" id="misPdf table table-striped">
          <table    class="table table-striped border border-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Unidades</th>
                <th scope="col">Precio</th>
                <th scope="col">Bonificacion</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody id="misPedidos" class="w-100">
    
            </tbody>
          </table>
      </div>
  
    </div>
  </div>
  
  <div class="btn-resetBase">
    <button id="btn-pdf"class="btn bg-danger text-light" type="button">Descargar PDF</button>
  </div>
</div>
</div>
<div class="btn-volver4 border border-ligth">
  <button id="btn-volverAtras4"class="btn bg-warning">Volver</button>
</div>` */