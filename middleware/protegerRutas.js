import Usuario from "../models/Usuario.js";
import  jwt from "jsonwebtoken";
const rutaProteger=async(req,res,next)=>{
    //verificar si hay token
    const {_token}=req.cookies
    console.log(_token)
    if(!_token){
        return res.redirect("/");
    }
    //verificar el token    
    try{
        const decoded=jwt.verify(_token,process.env.SC_JWT)
        const usuario=await Usuario.scope("elimiarClave").findByPk(decoded.id)
        //almacenar el usuario req
        if(usuario){
            req.usuario=usuario
        }else{
            return res.redirect("/")
        }
        return next()
    }catch(error){
        return res.clearCookie("_token").redirect("/")
    }
}

export default rutaProteger;