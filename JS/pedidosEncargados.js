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
              <input type="text" id="posicionPedido" placeholder="numero Pedido" class="input-class mb-3">

              <button id="btnPedidosGuardados" class="btn bg-danger text-light">Guardados</button>
              
            </div>

            

            <div id="contenedores"class="containerForm8 pdf-style" id="misPdf table table-striped">

            
            </div>
            <div id="productosGuardados">



            </div>

            <div id="verProductos">



            </div>

          </div>

          <div class="casillasTotalLista w-100 bg-dark text-light mb-3 fs-2">
            <div id="casillasTotalLista">
            </div>
            <div id="casillasTotalNeto">
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

  inputNombreCliente.addEventListener("input", () =>{
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
    <div id="cont-btnReset" class="w-100"></div>
  </table>`
    renderizarPedido(); 
    console.log(inputNombreCliente.value);
    verProductosGuardados(inputNombreCliente.value.toUpperCase())
  })
 
}

const renderizarPedido = () => {
  const pedidos = datos;
  const inputNombreCliente = document.getElementById("clienteNombre");
  const inputPosicion = document.getElementById("posicionPedido");
  const misPedidos = document.getElementById("misPedidos");

  const arrayFiltradoCliente = pedidos.filter(item => item.nombreCliente === inputNombreCliente.value.trim().toUpperCase());

  
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

    /* console.log(arrayFiltradoPorPosicion); */
  
    // Limpiamos los resultados anteriores antes de mostrar los nuevos
    misPedidos.innerHTML = '';
  
    arrayFiltradoPorPosicion.forEach((elemento,i) => {
      // Renderizamos los pedidos filtrados por posición
      const contenedorPepe = document.createElement("tr");
      let PrecioSinIVA =(elemento.precioProducto / 1.21).toFixed(2)
      contenedorPepe.innerHTML = `
        
      <td>${i}</td>
      <td>${elemento.id}</td>
      <td>${elemento.nombreProducto}</td>
      <td>${elemento.unidadesProducto}</td>
      <td>$${elemento.precioProducto} ARS</td>
      <td>$${PrecioSinIVA} ARS</td>
      <td>${(elemento.precioProducto - PrecioSinIVA).toFixed(2)}</td>
      <td>%${elemento.descuentoProducto}</td>
      <td>$${elemento.precioProducto * elemento.unidadesProducto} ARS</td>
      <td>$${calcularDescuentos(elemento.precioProducto,elemento.descuentoProducto)* elemento.unidadesProducto} ARS</td>
  
      `
      misPedidos.appendChild(contenedorPepe);

      const buttonGuardar = document.createElement("button");
      buttonGuardar.className="btn bg-danger text-light";
      buttonGuardar.textContent="Guardar";
      buttonGuardar.id= `btnGuardar${posicionSeleccionada}`;

      misPedidos.appendChild(buttonGuardar);

      buttonGuardar.addEventListener("click",() =>{
        console.log(`exelente guarde ${elemento.nombreProducto}`);
        pedidosGuardados.push(elemento);
        console.log(pedidosGuardados);
        localStorage.setItem("guardarPedidos", JSON.stringify(pedidosGuardados));
        
      })
    });
  });
}

const verProductosGuardados = (elementoNombre) => {
  const btnVerPedidos = document.getElementById("btnPedidosGuardados");
  btnVerPedidos.addEventListener("click", () => {
    const contVerPedidos = document.getElementById("misPedidos");
    const pedidos = JSON.parse(localStorage.getItem('guardarPedidos'));
    const filtracionNombre = pedidos.filter(elemento => elemento.nombreCliente === elementoNombre);

    // Vaciamos el contenido actual de los pedidos
    contVerPedidos.innerHTML = '';

    filtracionNombre.forEach((elemento, i) => {
      let PrecioSinIVA = (elemento.precioProducto / 1.21).toFixed(2);
      const inyectarHtml = document.createElement("tr");

      inyectarHtml.innerHTML = `<td>${i}</td>
        <td>${elemento.id}</td>
        <td>${elemento.nombreProducto}</td>
        <td>${elemento.unidadesProducto}</td>
        <td>$${elemento.precioProducto} ARS</td>
        <td>$${PrecioSinIVA} ARS</td>
        <td>${(elemento.precioProducto - PrecioSinIVA).toFixed(2)}</td>
        <td>%${elemento.descuentoProducto}</td>
        <td>$${elemento.precioProducto * elemento.unidadesProducto} ARS</td>
        <td>$${calcularDescuentos(elemento.precioProducto, elemento.descuentoProducto) * elemento.unidadesProducto} ARS</td>`;

      inyectarHtml.classList.add("pedido-guardado"); // Agregamos una clase CSS a los pedidos guardados
      contVerPedidos.appendChild(inyectarHtml);

     
    });

  


   calcularTotalPrecioLista(filtracionNombre);
   calcularTotalPrecioNeto(filtracionNombre);    
  });
  const contVerPedidos = document.getElementById("misPedidos");
  const contBotton = document.getElementById("cont-btnReset")

  const btnEliminarGuardados = document.createElement("button");
  btnEliminarGuardados.textContent = "Resetear";
  btnEliminarGuardados.className = "btn bg-dark text-light text-center mb-2"
  btnEliminarGuardados.id= `resetBtn`

  contBotton.appendChild(btnEliminarGuardados);
  contBotton.className ="diss"
  

  btnEliminarGuardados.addEventListener("click" , () =>{
    const totalCasilla = document.getElementById("casillasTotalLista");
    const casillasTotalNeto = document.getElementById("casillasTotalNeto");
    console.log("si funciona");
    localStorage.removeItem("guardarPedidos");
    contVerPedidos.innerHTML="";
    totalCasilla.innerHTML ="";
    casillasTotalNeto.innerHTML = "";
  })
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
  

const calcularTotalPrecioLista = (array) =>{
  const totalCasilla = document.getElementById("casillasTotalLista");
  const datosFinales = array;

 let total = datosFinales.reduce((acumulador,item) =>{
   return acumulador+= item.precioProducto * item.unidadesProducto
 },0)
 totalCasilla.innerHTML = `<p>Total Precios (lista) Mercaderia: $${total}</p>`
}

const calcularTotalPrecioNeto = (array) =>{
  const casillasTotalNeto = document.getElementById("casillasTotalNeto");
  const datosPrecios = array
  let salida =datosPrecios.reduce((acumulador,elemento) =>{
      return acumulador+= calcularDescuentos(elemento.precioProducto, elemento.descuentoProducto) * elemento.unidadesProducto
  },0)

  return casillasTotalNeto.innerHTML = `<p>Total Precios (neto) Mercaderia: $${salida}</p>`
}