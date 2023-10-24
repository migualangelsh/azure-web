import db from '../../../config/db.js';
import {check,validationResult} from 'express-validator';
import Gerente from '../../../models/Gerente.js';
import MisDatos from '../../../models/MisDatos.js';


const menu=(req,res)=>{
    res.render('inicio');
}

//se traen todos los hoteles que no tienen Gerente
async function consulta(){
    let hoteles = await db.query(
        "select id_htl as dato1,nombre as dato2 "+
         "from hoteles where id_htl not in (select id_htl from gerentes)"
      ,{
        model:MisDatos,
        mapToModel:true
      });
    return hoteles;
}

const altaGerente=async(req,res)=>{
    if(req.query.id){
        modificar=true;
        const id=await Gerente.findByPk(req.query.id)
        res.render('hotel/gerente/altagerente',{
            pagina:"Alta Gerente",
            info:await consulta(),
            dato:{
                nombre:id.nombre,
                aPaterno:id.ap_paterno,
                aMaterno:id.ap_materno,
                telef:id.telefono
            },
        });
    }else{
        res.render('hotel/gerente/altagerente',{
            pagina:"Alta Gerente",
            info:await consulta()
        });
    }
    
}
const registrando=async(req,res)=>{
    let valido=await validacionFormulario(req);
    if(!valido.isEmpty()){
        return res.render("hotel/gerente/altagerente",{
            pagina:"Alta Gerente",
            info:await consulta(),
            dato:{
                nombre:req.body.nombre,
                aPaterno:req.body.ap_paterno,
                aMaterno:req.body.ap_materno,
                telef:req.body.telefono
            },
            hotelselect:req.body.hotelid,
            errores:valido.array()
        });
    }
    //verificar que no se tenga un gerente con el mismo telefono
    const verificarTelefono=await Gerente.findOne({where:{telefono:req.body.telefono}});
    if(verificarTelefono){
        return res.render("hotel/gerente/altagerente",{
            pagina:"Alta Gerente",
            info:await consulta(),
            dato:{
                nombre:req.body.nombre,
                aPaterno:req.body.ap_paterno,
                aMaterno:req.body.ap_materno,
                telef:req.body.telefono
            },
            hotelselect:req.body.hotelid,
            errores:[{msg:"Ya esta registrado un gerente con el mismo telefono"}]
        });
    }
    const gerente=await Gerente.create(req.body);
    res.render("hotel/gerente/altagerente",{
        pagina:"Gerente se registro exitosamente",
        info:await consulta()
    });
    
}

async function validacionFormulario(req){
    await check('nombre').notEmpty().withMessage("Nombre no debe ser vacio").run(req);
    await check('ap_paterno').notEmpty().withMessage("Apeliido paterno no debe ser vacio").run(req);
    await check('ap_materno').notEmpty().withMessage("Apellido materno no debe ser vacio").run(req);
    await check('telefono').notEmpty().withMessage("Telefono no debe ser vacio").run(req);
    let salida=validationResult(req);    
    return salida;
}


export {
    altaGerente,
    registrando,
    menu    
}