// Funcion ingreso Usuario
const permitirIngreso = () => {
    const ingreso = document.createElement("div");
    ingreso.innerHTML = `
        <label class="mb-1">Ingrese Nombre Usuario</label>
        <input id="nombreUsuario" type="text" placeholder="Nombre de Usuario">
        <label class="mb-1">Ingrese contraseña</label>
        <input id="contrasenaUsuario" type="password" placeholder="Contraseña">
        <p id="errorIngreso"></p>
        <button class="btn text-warning border-warning mt-2" type="submit">Ingresar</button>`;

    usuario.appendChild(ingreso);

    const nombreUsuario = document.getElementById("nombreUsuario");
    const contraseñaUsuario = document.getElementById("contrasenaUsuario");

    usuario.addEventListener("submit", (e) => {
        e.preventDefault();

        if (nombreUsuario.value.toUpperCase() === "HUGO" && contraseñaUsuario.value.toUpperCase() === "HUGOCOLON10"){
            usuario.innerHTML = "";
            renderContButtonsEleccion();
            btnCargarProductos();
            btnCalcularProductos();
            btnBaseDatos();
            btnCargarPedidos();
            
        }else {
            const errorIngreso = document.getElementById("errorIngreso");
            errorIngreso.textContent = "Ingreso Erróneo, vuelve a intentar!";
            errorIngreso.classList.add("text-danger");
            setTimeout(() => {
                errorIngreso.textContent = "";
            }, 3000);
        }
    });
};

// Funcion CARGAR productos o calcular productos 
const renderContButtonsEleccion = () =>{
    const cargarOcalcular = document.getElementById("cargaProductos");
    return cargarOcalcular.innerHTML= 
    ` 
    <div id="cont-buttons" class="cont-buttons">
        <h3>PANEL DE CONTROL</h3>
        <div class="cont-btn-eleccion">
            <button id="btn-calcularProductos" class="btn bg-dark text-warning">Hacer Pedido</button>
        
       
            <button id="btn-cargarProductos" class="btn bg-dark text-warning">Cargar Productos</button>
        
       
            <button id="btn-baseDatos" class="btn bg-dark text-warning">Base de Datos</button>

            <button id="btn-misPedidos" class="btn bg-dark text-warning">Mis Pedidos</button>
        </div>
    </div> `
}