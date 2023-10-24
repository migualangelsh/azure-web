//ECMAScript 
import express from "express"; 
import csrf  from "csurf";
import cookieParser from "cookie-parser";
import credenciales_router from "./routes/credenciales_router.js";
import router_Hotel from "./routes/hotel_router.js";
import db from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config({path:'.env'});

//Crear la aplicación
const app = express();

//accesos a los datos del formulario
app.use(express.urlencoded({extended:true}))

//habilitar cookie parser
app.use(cookieParser())

//CSRF
app.use(csrf({cookie:true}))

//conectando a la base de datos
try {
  await db.authenticate();
  db.sync()
  console.log("Conexion exitosa a la b.d");
} catch (error) {
  console.log(error);
}

//pug
app.set("view engine", "pug");
app.set("views", "./views");

//carpeta publica
app.use(express.static("public"));

//routing
app.use("/", credenciales_router);
app.use("/cred", credenciales_router);
app.use("/hotel", router_Hotel);

//definiendo el puerto
const port =process.env.PORT_BACKEND || 2800;
app.listen(port, () => {
  console.log(`Esperando peticiones en el puerto ${port}`);
});
