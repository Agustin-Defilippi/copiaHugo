// Funcion Click button Cargar productos
const btnCalcularProductos = () =>{
    const btnCalcular = document.getElementById("btn-calcularProductos");
    
    const containerButtons = document.getElementById("cargaProductos");

    btnCalcular.addEventListener("click", () =>{
        contPadre.innerHTML = renderContPadre();
        setupInputMercaderiaChange();
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

                            <label class="mb-2"><b>Ingrese numero de Mercaderia a evaluar</b></label>
                            <input type="text" id="mercaderiaNum" placeholder="numero" class="input-class">
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


const mostrarBtnFinalizar = () => {
    const contBtnFinalizar = document.getElementById("cont-btnFinalizar");
    contBtnFinalizar.innerHTML = `<button id="btn-finalizar" class="btn bg-danger text-light">Descontar Stock</button>`;
    const inputMercaderia = document.getElementById("mercaderiaNum");
    const btnFinalizar = document.getElementById("btn-finalizar");
  
    btnFinalizar.addEventListener("click", () => {
      const prodBasedeDatos = JSON.parse(localStorage.getItem("baseDatos"));
      
  
      for (let i = 1; i <= inputMercaderia.value; i++) {
        const nombre = document.getElementById(`input-nombre${i}`).value.trim().toUpperCase();
        const productoUnidades = parseInt(document.getElementById(`input-unidades${i}`).value);
  
        console.log("btn-finalizar sirve");
        console.log(prodBasedeDatos);
        let pepo = prodBasedeDatos.find((element) => element.nombre === nombre);
  
        if (pepo) {
          pepo.unidades -= productoUnidades;
        }
  
        console.log("Producto encontrado:", pepo)
      
      }
      
      localStorage.setItem("baseDatos", JSON.stringify(prodBasedeDatos));
    });
    
};
  

const setupInputMercaderiaChange = () => {
    const inputMercaderia = document.getElementById("mercaderiaNum");
    const inputNombreCliente1 = document.getElementById("nombreDestinatario");

   
        
        inputMercaderia.addEventListener("change", () => {
            if(inputNombreCliente1.value !== "" && (isNaN(inputNombreCliente1.value))){
                const mercaderia = document.getElementById("mercaderia");
            mercaderia.innerHTML = "";
            let cantidadMercaderia = document.createElement("div");
                    
            renderContenedoresMercaderia(inputMercaderia.value,cantidadMercaderia);
            renderFormulario(cantidadMercaderia);
           
            mercaderia.appendChild(cantidadMercaderia);
    
            const formulario = document.getElementById("formulario");
    
            formulario.addEventListener("submit", (e) => {
                e.preventDefault();
                for (let i = 1; i <= inputMercaderia.value; i++) {

                    
                    const nombreMercaderia = document.getElementById(`input-nombre${i}`).value.trim().toUpperCase();
                    const unidadesProducto =  parseInt(document.getElementById(`input-unidades${i}`).value);
                    const precioMercaderia = document.getElementById(`input-precio${i}`).value;
                    const descuentoProducto = document.getElementById(`input-descuento${i}`).value;
    
                    const nombreDestinatario = document.getElementById("nombreDestinatario").value.trim().toUpperCase();

                    const idUnicoParaCadaProductoo = document.getElementById(`producto${i}`)
    
                    let neto = valorPrecioNeto(precioMercaderia,descuentoProducto,unidadesProducto)
    
                    let almacenDatos = alamacenarDatos(nombreDestinatario,nombreMercaderia,unidadesProducto,precioMercaderia,descuentoProducto,neto,idUnicoParaCadaProductoo);
                    datos.push(almacenDatos);
                    localStorage.setItem("misPedidos",JSON.stringify(datos))
                    calcularSubTotalLista(precioMercaderia,unidadesProducto,i);
                    calcularSubTotalNeto(precioMercaderia,descuentoProducto,i,unidadesProducto)
                    calcularTotalPrecioLista();
                    calcularTotalPrecioNeto();
                    mostrarBtnFinalizar();
                    console.log(datos);
                    
                }
            });
    
            const btnReset = document.getElementById("btn-reset");
            btnReset.addEventListener("click", () =>{
                resetearCasillas(formulario,datos)
                console.log(datos);
                for (let i = 1; i <= inputMercaderia.value; i++) {
                    const subTotalCasilla = document.getElementById(`subTotalCasillas${i}`);
                    const subTotalCasillaNeto = document.getElementById(`subTotalCasillasNeto${i}`);
    
                    subTotalCasilla.innerHTML = `<b><p id="subTotalLista">SUBTOTAL LISTA: 0</p></b>`;
                    subTotalCasillaNeto.innerHTML = `<b><p id="subTotalLista">SUBTOTAL NETO: 0</p></b>`;
                }
               console.log(datos);
              /*  calcularTotalPrecioLista();
               calcularTotalPrecioNeto(); */
            })
            }
            
        });
    

   
    volverAtrasCalcularProducto();
};


// render contenedor/es de mercaderia
const renderContenedoresMercaderia = (valor,contenedor) =>{
    for (let i = 1; i <= valor; i++) {
         const idUnicoParaCadaProducto = `producto${i}`;
     
        contenedor.innerHTML += `
            <div class="containers-mercaderia">
                <div class="mb-3 cantidades">
                    <label class="mb-2"><b>*Nombre Producto (${i})</label></b>
                    <input type="text" id="input-nombre${i}">
                </div>
                <div class="mb-3 cantidades">
                    <label class="mb-2"><b>*Unidades de producto (${i})</label></b>
                    <input type="text" id="input-unidades${i}">
                </div>
                <div class="mb-3 cantidades">
                    <label class="mb-2"><b>*Precio de producto (${i})</label></b>
                    <input type="text" id="input-precio${i}">
                </div>
                <div class="mb-3 cantidades">
                    <label class="mb-2"><b>*Descuento Producto (${i})</label></b>
                    <input type="text" id="input-descuento${i}">
                </div>
                <div class="mb-3 cantidades bg-warning" id="subTotalCasillas${i}">
                    <b><p id="subTotalLista">SUBTOTAL LISTA: 0</p></b>
                </div>
                <div class="mb-3 cantidades bg-warning" id="subTotalCasillasNeto${i}">
                <b><p id="subTotalNeto" class="bg-warning">SUBTOTAL NETO: 0</p></b>
                </div>
            </div>`;

            return idUnicoParaCadaProducto
    }

  
}

// Funcion para render de formulario envio datos inputs mercaderia
const renderFormulario = (contenedor) =>{
    contenedor.innerHTML = `
    <form id="formulario" class="formularioDatos">
        <div>${contenedor.innerHTML}</div>
        <button class="btn text-warning  btn-calcular bg-dark border-warning mt-2" type="submit">Calcular</button>
        <button id="btn-reset" class="btn text-warning  btn-calcular bg-dark border-warning mt-2" type="button">Resetear</button>
    </form>`;
}

const alamacenarDatos = (nombreDestinatario,nombre,unidades,precio,descuento,precioNeto,id) =>{

    const datosMercaderia={
        nombrePedido: nombreDestinatario,
        nombre: nombre,
        unidades: unidades,
        precio: precio,
        descuento: descuento,
        precioNeto : precioNeto,
        id : id
    }
    return datosMercaderia
}

// Funcion Calcular descuentos
const calcularDescuentos = (precioProducto,porcentajeDescuento) =>{
    const descuento = (precioProducto * porcentajeDescuento) / 100;
    const precioConDescuento = precioProducto - descuento;
    return (precioConDescuento).toFixed(2);
}

// Funcion subTotal de casillas individuales
const calcularSubTotalLista = (precio, unidades, iteracion) => {
    const subTotalCasilla = document.getElementById(`subTotalCasillas${iteracion}`);

    if (subTotalCasilla !== null) {
      return subTotalCasilla.innerHTML = `<b><p">SUBTOTAL LISTA: $${precio * unidades}</p></b>`;
      
    } else {
      return subTotalCasilla.innerHTML = "";
    }
  }

// Funcion subTotal de casillas individuales
const calcularSubTotalNeto = (precio,descuentoProducto,iteracion,unidades) =>{
    const subTotalCasillaNeto = document.getElementById(`subTotalCasillasNeto${iteracion}`);

    if(subTotalCasillaNeto !== null){

      return subTotalCasillaNeto.innerHTML = `<b><p>SUBTOTAL NETO: $${calcularDescuentos(precio,descuentoProducto)*unidades}</p></b>`;
    }else{
        return subTotalCasillaNeto.innerHTML =""
    }
}

const valorPrecioNeto = (precio,descuentoProducto,unidades) =>{
   return calcularDescuentos(precio,descuentoProducto)*unidades
}

// Funcion Total de  todas las casillas
const calcularTotalPrecioLista = () =>{
    const totalCasilla = document.getElementById("casillasTotalLista");
    const datosFinales = datos;

   let total = datosFinales.reduce((acumulador,item) =>{
     return acumulador+= item.precio * item.unidades
   },0)
   totalCasilla.innerHTML = `<p>Total Precios (lista) Mercaderia: $${total}</p>`
}

const calcularTotalPrecioNeto = () =>{
    const casillasTotalNeto = document.getElementById("casillasTotalNeto")
    const datosPrecios = datos
    let salida =datosPrecios.reduce((acumulador,item) =>{
        return acumulador+= item.precioNeto
    },0)

    return casillasTotalNeto.innerHTML = `<p>Total Precios (neto) Mercaderia: $${salida}</p>`
}

// Funcion Reseto de casillas
const resetearCasillas = (form) =>{
    form.reset();
/*     array.length=0;
    localStorage.setItem("misPedidos",JSON.stringify(array)) */
    const totalLista = document.getElementById("casillasTotalLista");
    const totalNeto = document.getElementById("casillasTotalNeto")
    totalLista.innerHTML="";
    totalNeto.innerHTML="";
  
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
