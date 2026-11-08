//variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");
let buscarInput = d.querySelector(".buscar");
let btnBuscar = d.querySelector(".btn-buscar");

//filtrar la tabla mientras se escribe y al pulsar Buscar
function filtrarTabla() {
    borrarTabla();
    mostrarDatos();
}
buscarInput.addEventListener("input", filtrarTabla);
btnBuscar.addEventListener("click", filtrarTabla);


//agregar evento click al boton del formulario
btnGuardar.addEventListener("click", () => {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    if(datos != null) {
        guardarDatos( datos );
    }
    
    borrarTabla();
    mostrarDatos();
});


//fuincion para validar los campos del formulario 
function validarFormulario() {
    let datosForm;
    if( clienteInput.value == "" || productoInput.value == "" || precioInput.value == "" || imagenInput.value == ""){
        alert("Todos los campos del Formulario son obligatorios");
        return;
    }else {
        datosForm = {
            cliente : clienteInput.value,
            producto : productoInput.value,
            precio : precioInput.value,
            imagen : imagenInput.value,
            observacion :observacionInput.value
        }
    
    console.log(datosForm);
    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm;
    }    
}

//funcion guardar datos en locaSotage

const listadoPedidos = "Pedidos";
function guardarDatos( datos ) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem("listadoPedidos"));    
    //extraer datos guardados previamente en el localStorage
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //agregar el pedido nuevo al array
    pedidos.push(datos);
    //guardar en localStorage
    localStorage.setItem("listadoPedidos", JSON.stringify(pedidos));
    //valdiar que los datos fueron guardados
    alert("Datos guardados con exito");

}

//funcion para extrae datos guardados en el localStorage
function mostrarDatos() {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem("listadoPedidos")); 
     //extraer datos guardados previamente en el localStorage
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //console.log(pedidos);
    //mostrar los datos en la tabla
    //texto del filtro (vacio = mostrar todo)
    let texto = buscarInput.value.trim().toLowerCase();
    pedidos.forEach((p,i)=>{
        //el indice i es la posicion real en localStorage, se conserva al filtrar
        let coincide = [p.cliente, p.producto, p.precio, p.observacion]
            .some(v => String(v ?? "").toLowerCase().includes(texto));
        if( !coincide ){
            return;
        }
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td> ${i+1} </td>
            <td> ${ p.cliente } </td>
            <td> ${ p.producto } </td>
            <td> ${ p.precio } </td>
            <td> <img src="${ p.imagen }" width="50%" >  </td>
            <td> ${ p.observacion } </td>
            <td> 
                <span onclick="actualizarPedido(${i})"class="btn-editar btn btn-warning"> 🗒️ </span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger"> ✖️ </span>
            </td>
        `;
        tabla.appendChild(fila);
    });

}

//quitar los datos de la tabla 
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr");
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    });
}

//funcion eliminar un pedido de la tabla
function eliminarPedido( pos ) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem("listadoPedidos")); 
     //extraer datos guardados previamente en el localStorage
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //confirmar pedido a eliminar
    let confirmar = confirm("Deseas eliminar este pedido: "+pedidos[pos].cliente +"?");
    if( confirmar ){
        //alert("Lo eliminaste");
        pedidos.splice(pos,1);
        alert("Pedido eliminado con exito");
        //guardar los datos que quedaron en localStorage
        localStorage.setItem("listadoPedidos", JSON.stringify(pedidos));
        borrarTabla();
        mostrarDatos();
    }
}

//actualizar pedido de loscalStorage
function actualizarPedido( pos ) {
    let pedidos = [];
    //extraer datos guardados previamente en el localStorage
    let pedidosPrevios = JSON.parse(localStorage.getItem("listadoPedidos")); 
     //extraer datos guardados previamente en el localStorage
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //pasar los datos al forms para editarlos
    clienteInput.value = pedidos[pos].cliente;
    productoInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    observacionInput.value = pedidos[pos].observacion;
    //seleccionar el boton de actualizar
    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
    //agregarevento al boton de actualizar
    btnActualizar.addEventListener("click", function(){
        pedidos[pos].cliente = clienteInput.value
        pedidos[pos].producto = productoInput.value
        pedidos[pos].precio = precioInput.value
        pedidos[pos].observacion = observacionInput.value
        //guardar los datos editados en localStorage
        localStorage.setItem("listadoPedidos", JSON.stringify(pedidos));
        alert("El dato fue actualiza con exito!!");

        clienteInput.value = "";
        productoInput.value = "";
        precioInput.value = "";
        observacionInput.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        borrarTabla();
        mostrarDatos();

    });

}



//mostrar los datos de localStorage al recargar la pagina
d.addEventListener("DOMContentLoaded", function (){
    borrarTabla();
    mostrarDatos();
})


