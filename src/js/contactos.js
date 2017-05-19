//module alumnos
import * as service from "./genericservice";
const urlAlumnos = "http://localhost:8080/gestiondocente/api/contactos";

export class ContactoService extends service.GenericService {
    constructor(){
        super();
    }
    getAll(){
        return super.ajax(urlContactos,"get",null);
    }
    getById(codigo){
        return super.ajax(urlContactos+"/"+codigo,"get",null);
    }
}
export class Contacto {
    constructor(){
        this._codigo = -1;
        this._nombre ="";
        this._ambito="";
        this._telefono="";

    }
    get codigo() {
        return this._codigo;
    }

    set codigo(code) {
        this._codigo = code;
    }
    get nombre() {
        return this._nombre;
    }

    set nombre(name) {
        this._nombre = name;
    }

    get telefono() {
        return this._telefono;
    }

    set telefono(telephone) {
        this._telefono = telephone;
    }

    get ambito() {
        return this._ambito;
    }

    set ambito(ambito) {
        this._ambito = ambito;
    }

}
