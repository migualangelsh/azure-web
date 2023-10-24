import Usuario from "../../models/Usuario.js";
import { check, validationResult } from "express-validator";

import { idGenera,JWTGenera } from "../../helpers/tokens.js";
import {correoRegistro} from '../../helpers/correos.js'
import dotenv from 'dotenv'

dotenv.config({path:'.env'});

const inicioSesion = (req, res) => {
  res.render("credenciales/login", {
    pagina: "Autentificación",
    csrf:req.csrfToken()
  });
};

const credenciales =async (req, res) => {
  let valido = await validacionFormularioInicio(req);

  if (!valido.isEmpty()) {
    return res.render("credenciales/login", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken(),
      errores: valido.array(),
    });
  }
  //comprobar si el usuario existe
  const{correo,password}=req.body
  const us=await Usuario.findOne({where:{correo}})
  if(!us){
    return res.render("credenciales/login", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken(),
      errores: [{msg:'El usuario no existe'}]
    });
  }
  //comprobar si el usuario esta confirmado
  if(!us.confirmar){
    return res.render("credenciales/login", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken(),
      errores: [{msg:'Tu cuenta no tiene confirmación, revisa tu correo'}]
    });
  }
  //comprobando el password
  if(!us.verificandoClave(password)){
    return res.render("credenciales/login", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken(),
      errores: [{msg:'Credenciales no validas'}]
    });
  }
  //crean jsonwebtoken
  const token=JWTGenera({id:us.id_usr,mail:correo})
  //almacenar el token en un cookies
  //res.session.cookie.expires=false;
  //res.session.cookie.expires=Ma
  return res.cookie('_token',token,{
      httpOnly:true, //no accesible desde el API de JavaScript
      maxAge:60*1000         
      //secure:true     //certificado ssh
  }).redirect("/hotel/menu");
  console.log(token)
};

const registrandoEnlace = (req, res) => {
    res.render("credenciales/registrar", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken()
    });
  };
const registrando = async (req, res) => {
  let valido = await validacionFormulario(req);

  if (!valido.isEmpty()) {
    return res.render("credenciales/registrar", {
      pagina: "Alta Usuario",
      csrf:req.csrfToken(),
      errores: valido.array(),
    });
  }
  const usuario = await Usuario.create({
    nombre: req.body.usuario,
    password: req.body.clave,
    correo:req.body.correo,
    token:idGenera()
  });

  //mandando el correo
  correoRegistro({
      nombre:usuario.nombre,
      correo:usuario.correo,
      token:usuario.token
  })

  //mostrar mensaje de confirmacion  

  res.render("credenciales/confirmacion", {
    pagina: "Usuario se registro exitosamente",
    mensaje:"Se envio un correo de confirmacion, presiona en 'Confirmar' dentro del correo"
  });
};

const confirmarIncripcionEnlace = async (req, res) => {
    const {token} =req.params;
   //token valido
   const usuario=await Usuario.findOne({
    where:{token}
   });

   if(!usuario){
    res.render("credenciales/confirmacion", {
      pagina: "No se pudo confirmar tu cuenta",
      mensaje:"Lo lamentamos no se pudo confirmar la cuenta intentalo de nuevo"
    });
   }

   //confirmar la cuenta del usuario
   usuario.token=null;
   usuario.confirmar=true;
   await usuario.save();
  
   res.render("credenciales/confirmacion", {
    pagina: "Su cuenta se confirmo exitosamente",
    mensaje:"Felicidades el registro se termino exitosamente",
    enlace:"salto"
  });


}

async function validacionFormulario(req) {
  await check("usuario")
    .notEmpty()
    .withMessage("Usuario no debe ser vacio")
    .run(req);
  await check("clave")
    .notEmpty()
    .isLength({min:5})
    .withMessage("Clave no debe ser vacio o tiene que tener al menos 5 caracteres")
    .run(req);
  await check("correo")
    .notEmpty()
    .withMessage("Correo no debe ser vacio")
    .run(req);
    
  let salida = validationResult(req);
  return salida;
}
async function validacionFormularioInicio(req) {
  await check("correo")
    .notEmpty()
    .withMessage("El correo no debe ser vacio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("Clave no debe ser vacio")
    .run(req);    
  let salida = validationResult(req);
  return salida;
}
async function consulta() {
  //validar que no tengamos dos correos iguales ni usuarios iguales
}

export { credenciales, registrandoEnlace,registrando, inicioSesion,confirmarIncripcionEnlace };
