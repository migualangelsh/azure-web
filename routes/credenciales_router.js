import express from "express";
import {inicioSesion,credenciales,registrandoEnlace,registrando,confirmarIncripcionEnlace} from "../controllers/credenciales/loginController.js"
const routerCredenciales=express.Router();
//Routing
//para la vista alta credenciales
routerCredenciales.get('/',inicioSesion);
routerCredenciales.post('/credenciales',credenciales);
//para registrar usuario
routerCredenciales.get('/registrar',registrandoEnlace);
routerCredenciales.post('/registrar',registrando);

//confirmando el token
routerCredenciales.get('/confirmarinscripcion/:token',confirmarIncripcionEnlace);


export default routerCredenciales