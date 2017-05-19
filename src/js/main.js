import $ from "jquery";
window.jQuery = window.$ = $;

import * as alumno from "./contactos";
require("bootstrap");

var $listadoContactos =$("#listadoContactos");
if(listadoContactos.length) {//estamos en la página de alumnos
    var as = new contacto.ContactoService();

    as.getAll()
        .then(function(data) {
            // console.log(data);
            cargarArrayContactos(JSON.parse(data));
        }, function (error) {//error
            console.log(error);
        }).catch(function () {

    });
}
$("#contactForm").on("submit",validarFormularioContacto);
$("#listadoContactos div a:last-child").click(borrarVarios);

$("#tablaContactos tbody").on("click","td:last-child button:last-child",function(){
    //alert("has pulsado el boton de borrado");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para Borrar
    //
    // alert(codigo);
    //borra la tupla del boton que se ha seleccionado
    $(this).parents("tr").remove();
});
$("#tablaContactos tbody").on("click","td:last-child button:first-child",function(){
    //alert("has pulsado el boton de actualizar");
    var codigo = $(this).parents("tr").find("input[type=checkbox]").val();
    //Llamar al REST para el GetById
    var nombre = $(this).parents("tr").find("td:nth-child(2)").text();
});
$("#borrartodos").click(function (event) {
    //attr ---> cambios de atributos
    // prop --> propiedades
    // is ----> validacion booleana
    if($(this).is(":checked")){
        $("tbody input[type=checkbox]").prop("checked",true);
        //
        //checked = checked
        //selected= selected
        //
    }else{
        $("tbody input[type=checkbox]").prop("checked",false);
    }


});
function borrarVarios() {
    //recoger los checksboxes marcados
    $("#tablaAlumnos tbody input:checked").each(function () {
        var codigo = $(this).val();
        //Llamar al REST
        $(this).parents("tr").remove();


    });
    $("tbody tr").length;
}

function validarFormularioContacto(){
    //recoger los valores de la vista
    var pdni = $("#dni").val();
    var pnombre = $("#nombre").val();
    var papellidos = $("#apellidos").val();
    var ptelefono = $("#telefono").val();
    var valido = false;
    //evaluarlos
    var dniValido= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
    var nomValido = validarNombre(pnombre);
    var apeValido = validarApellidos(papellidos);
    var teleValido = validarTelefono(ptelefono);
    $("#dni").siblings("div.text-error").text("");
    $("#nombre").siblings("div.text-error").text("");
    $("#apellidos").siblings("div.text-error").text("");
    $("#telefono").siblings("div.text-error").text("");
    if(dniValido&&nomValido&&apeValido&&teleValido){
        // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        valido = true;
    }else {
        //mostar mensaje de error
        if(!dniValido){
            $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
        }
        if(!nomValido){
            $("#nombre").siblings("div.text-error").text("El nombre tiene que tener al menos 3 letras");
        }
        if(!apeValido){
            $("#apellidos").siblings("div.text-error").text("Los apellidos tienen que tener al menos 7 letras");
        }
        if(!teleValido){
            $("#telefono").siblings("div.text-error").text("El telefono no es valido, tiene que tener 9 numeros");
        }
        //text y html
    }
    return false;
}
function cargarArrayContactos(contactos) {
    //recorrer el array
    console.log(contactos.length );
    if (contactos.length > 0) {
        for(var i = 0; i < contactos.length; i++) {
            console.log(contactos[i]);
            var codigo = contactos[i].codigo;
            var nombre = contactos[i].nombre;
            var telefono = contactos[i].telefono;
            var htmlEdit ="<button>Editar</button>";
            var htmlDelete ="<button>Borrar</button>";

            var texto = "<tr><td><input type='checkbox' value='" + codigo + "'></td><td>"+nombre+"</td><td>"+telefono+"</td><td>"+htmlEdit+htmlDelete+"</td></tr>";
            //añadir el html correspondiente a la página
            $("#tablaContactos tbody").append(texto);
        }
        $("#tablaContactos tfoot td").html("<span class='text-error'>Total contactos:"+contactos.length,10+"</span>");
    }else{
        $("#listadoContactos").append("No se han encontrado alumnos")
    }
}
function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}
