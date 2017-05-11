$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);


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
});

function validarNombre(nombre){
    const pattern = new RegExp(/[a-zA-Z]{3,}/);
    return pattern.test(nombre);
}
function validarApellidos(apellidos) {
    const pattern = new RegExp(/[a-zA-Z]{2,}\s[a-zA-Z]{2,}/);
    return pattern.test(apellidos);
}
function validarTelefono(telefono){
    var valido = true;
    if(telefono!=""){
        const pattern = new RegExp(/\d{9}/);
        valido = pattern.test(telefono);
    }
    return valido ;
}

function validarDni(dni) {
    var valido =false;
    const pattern = new RegExp(/\d{8}[A-Za-z]{1}/);
    if(pattern.test(dni)){
        numero = parseInt(dni.substr(0,dni.length-1),10);
        letr = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra==letr.toUpperCase()) {
            valido = true;
        }
    }
    return valido;
}
