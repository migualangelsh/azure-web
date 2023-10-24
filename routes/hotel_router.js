import express from "express";
import {altaGerente,registrando,menu} from "../controllers/hotel/gerente/altagerenteController.js";
import { modificarGerente,accionbuscarHotelGerente,accionLlenarFormulario,registrandoModificar} from "../controllers/hotel/gerente/modificarGerenteController.js";
import {consultaGerente} from "../controllers/hotel/gerente/consultarGerenteController.js";
import {borrarGerente,accionBuscarHotel,accionBorrarGerente} from "../controllers/hotel/gerente/borrarGerenteController.js";
import rutaProteger from "../middleware/protegerRutas.js"

const router_Hotel=express.Router();
//Routing

//ruta para iniciar el menu de modificaciones
router_Hotel.get('/menu',rutaProteger, menu);

//rutas para dar de alta
router_Hotel.get('/gerente/alta',rutaProteger,altaGerente);
router_Hotel.post('/gerente/registrandoGerente',registrando);

//rutas para consultar
router_Hotel.get('/gerente/consultaGerentes',consultaGerente);

//rutas para modificar
router_Hotel.get('/gerente/modificar',modificarGerente);
router_Hotel.post('/gerente/buscarHotelGerente',accionbuscarHotelGerente);
router_Hotel.get('/gerente/llenarFormulario',accionLlenarFormulario);
router_Hotel.post('/gerente/accionModificar',registrandoModificar);


//metodos para borrar
router_Hotel.get('/gerente/borrar',borrarGerente);
router_Hotel.post('/gerente/buscarGerenteHotel',accionBuscarHotel);
router_Hotel.get('/gerente/eliminarGerente',accionBorrarGerente);


export default router_Hotel
