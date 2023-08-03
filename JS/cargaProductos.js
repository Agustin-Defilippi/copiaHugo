// Funcion Click button Calcular productos
const btnCargarProductos = () =>{
    
  const btnCargar = document.getElementById("btn-cargarProductos");
  const containerButtons = document.getElementById("cargaProductos");

  btnCargar.addEventListener("click", () =>{
      
      cargaStockProductos()
      containerButtons.innerHTML = "";
      containerButtons.className= "heigth-0"
  })
}

// Funcion para crear los input de CARGA de productos
const crearNuevoCampo = () => {
    const formElementsDiv = document.getElementById('formElements');
    
    const nuevoProductoDiv = document.createElement('div');
  
    const nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    nombreInput.placeholder = 'Nombre del producto';
    nombreInput.className="m-1";
  
    const precioInput = document.createElement('input');
    precioInput.type = 'text';
    precioInput.placeholder = 'Precio';
    precioInput.className="m-1";
    
  
    const categoriaInput = document.createElement('input');
    categoriaInput.type = 'text';
    categoriaInput.placeholder = 'Categoria';
    categoriaInput.className="m-1";
  
    const unidadesInput = document.createElement('input');
    unidadesInput.type = 'number';
    unidadesInput.placeholder = 'Unidades';
    unidadesInput.className="m-1";
  
    nuevoProductoDiv.appendChild(nombreInput);
    nuevoProductoDiv.appendChild(precioInput);
    nuevoProductoDiv.appendChild(categoriaInput);
    nuevoProductoDiv.appendChild(unidadesInput);
  
    formElementsDiv.appendChild(nuevoProductoDiv);
}

// Función para CARGAR el formulario de stock
const renderFormStock = () => {
    crearNuevoCampo();
};

// Funcion eventica para renderizar el formulario infinito
const agregarCampoOnClick = () => {
  const botonAgregarCampo = document.getElementById('btn-stock');
  botonAgregarCampo.addEventListener('click',
   renderFormStock
 );
}

const terminarCargaProducto = () =>{
    const btnTerminar = document.getElementById("btn-terminar");
    const formElements = document.getElementById("formElements");
    

    btnTerminar.addEventListener("click", () =>{
        formElements.innerHTML="";
        console.log(stockProductos);
        agregarCampoOnClick()
    })
}

const cargaStockProductos = () => {
  const containerProductos = document.getElementById("cargaDeProductos");
  containerProductos.innerHTML = `
    <div class="containerPrograma2" id="containerPrograma2">
      <div class="containerForm2">
        <h1>PROGRAMA MERCADERIA HUGO</h1>
        <div class="containerForm3">
          <div class="containerForm4">
            <h2>Cargar Productos</h2>   
            <form class="form" id="formStock">
              <div id="formElements">
                
              </div>
              <div class="my-2 botonesCargar">
                <button id="btn-stock" type="button" class="btn bg-dark text-warning">Producto(+)</button>
                <button type="submit" class="btn bg-dark text-warning">Enviar(+)</button>
                <button id="btn-terminar" type="button" class="btn bg-dark text-warning">Resetear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-volver2 border border-ligth">
        <button id="btn-volverAtras2"class="btn bg-warning">Volver</button>
    </div>`;
    
  containerProductos.className = "cargaDeProductos";
  console.log("cargaStockProductos ejecutado");
  agregarCampoOnClick();
  terminarCargaProducto()

 const formStock = document.getElementById("formStock");

 formStock.addEventListener("submit", (e) => {
 e.preventDefault();
 procesarFormulario();
 });

 volverAtrasCargarProducto()
};

const procesarFormulario = () => {
  const formElements = document.getElementById('formElements').children;
  const nuevosProductos = [];

  // Iteramos sobre los elementos del formulario
  for (const productoDiv of formElements){
    const nombre = productoDiv.children[0].value.trim().toUpperCase();
    const precio = parseFloat(productoDiv.children[1].value);
    const categoria = productoDiv.children[2].value;
    const unidades = parseInt(productoDiv.children[3].value);

    const producto = {
      nombre,
      precio,
      categoria,
      unidades,
    };

    nuevosProductos.push(producto);
  }

  // Obtenemos los productos previamente almacenados en el localStorage
  const productosPrevios = JSON.parse(localStorage.getItem("baseDatos")) || [];

  // Combinamos los productos previos con los nuevos productos
  const productosCombinados = [...productosPrevios, ...nuevosProductos];
  
  // Guardamos todos los productos en el localStorage
  localStorage.setItem("baseDatos", JSON.stringify(productosCombinados));

  console.log(productosCombinados);
};

// Funcion volver atras cargar producto
const volverAtrasCargarProducto = () =>{
    const btnVolver = document.getElementById("btn-volverAtras2");
    const containerPrograma2 = document.getElementById("cargaDeProductos");
    const cargarOcalcular = document.getElementById("cargaProductos");
    btnVolver.addEventListener("click", () =>{
        containerPrograma2.innerHTML="";
        cargarOcalcular.className="containerCargarOcalcular"
        renderContButtonsEleccion();
        btnCargarProductos();
        btnCalcularProductos();
        btnBaseDatos();
        btnCargarPedidos();
    })
}