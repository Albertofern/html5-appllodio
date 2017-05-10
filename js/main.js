$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $("#contactForm").on("submit",validarFormularioContacto);


    function validarFormularioContacto(){
        //recoger los valores de la vista
        var pdni = $("#dni").val();
        //evaluarlos
        var enviado= validarDni(pdni); //en funcion de si estan bien o mal o se envia o no
        if(enviado){
            // $("#contactForm").submit();//se envia el Formulario(Consumir REST)
        }else {
            //mostar mensaje de error
            $("#dni").siblings("div.text-error").text("El DNI esta mal formado");
            //text y html
        }
        return enviado;
    }
});

function validarDni(dni) {
    var valido =true;
    numero = parseInt(dni.substr(0,dni.length-1),10);
    letr = dni.substr(dni.length-1,1);
    numero = numero % 23;
    letra='TRWAGMYFPDXBNJZSQVHLCKET';
    letra=letra.substring(numero,numero+1);
    if (letra!=letr.toUpperCase()) {
        valido = false;
    }
    return valido;
}
