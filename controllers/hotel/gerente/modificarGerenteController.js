import { check, validationResult } from "express-validator";
import { Op } from "sequelize";
import Hotel from "../../../models/Hotel.js";
import Gerente from "../../../models/Gerente.js";

//se traen todos los gerentes de los hoteles que considan
async function consulta(valor) {
  let hoteles = await Hotel.findAll({
    include: {
      model: Gerente,
      required: true,
    },
    raw: true,
    nest: true,
    where: {
      nombre: {
        [Op.like]: "%" + valor + "%",
      },
    },
  });
  return hoteles;
}

const modificarGerente = async (req, res) => {
  res.render("hotel/gerente/modificargerente", {
    pagina: "Modificar Gerente",
    csrf:req.csrfToken(),
    vista: true,
  });
};
//buscar gerente por el nombre del hotel
const accionbuscarHotelGerente = async (req, res) => {
  const datos = await consulta(req.body.nombre);
  res.render("hotel/gerente/modificargerente", {
    pagina: "Modificar Gerente",
    dato: {
      nombre: req.body.nombre,
    },
    info: datos,
    vista: true,
  });
};

const accionLlenarFormulario = async (req, res) => {
  const info = await Gerente.findByPk(req.query.id);
  console.log(info.nombre);
  res.render("hotel/gerente/modificargerente", {
    pagina: "Modificar Gerente",
    valores: {
      nombre: info.nombre,
      aPaterno: info.ap_paterno,
      aMaterno: info.ap_materno,
      telef: info.telefono,
      id_grt: info.id_grt,
    },
  });
};

//validando que se tiene todo
const registrandoModificar = async (req, res) => {
  let valido = await validacionFormulario(req);
  if (!valido.isEmpty()) {
    return res.render("hotel/gerente/modificargerente", {
      pagina: "Modificar Gerente",
      valores: {
        nombre: req.body.nombre,
        aPaterno: req.body.ap_paterno,
        aMaterno: req.body.ap_materno,
        telef: req.body.telefono,
        id_grt: req.body.id_g,
      },
      errores: valido.array(),
    });
  }
  //verificar que no se tenga un gerente con el mismo telefono 2 veces
  const telVerificar = await Gerente.findByPk(req.body.id_g);
  //Si es diferente el telefono del formulario al de la base de datos
  if (telVerificar.telefono !== req.body.telefono) {
    //verificar que no tenga mas de uno
    const { count } = await Gerente.findAndCountAll({
      where: { telefono: req.body.telefono },
    });
    console.log(count);
    if (count >= 1) {
      return res.render("hotel/gerente/modificargerente", {
        pagina: "Modificar Gerente",
        valores: {
          nombre: req.body.nombre,
          aPaterno: req.body.ap_paterno,
          aMaterno: req.body.ap_materno,
          telef: req.body.telefono,
          id_grt: req.body.id_g,
        },
        errores: [
          { msg: "Ya esta registrado un gerente con el mismo telefono" },
        ],
      });
    }
  }

  const { id_g: id_grt, nombre, ap_paterno, ap_materno, telefono } = req.body;
  console.log(req.body);
  //const gerente = await Gerente.findByPk(id_grt);
  telVerificar.set({
    nombre,
    ap_paterno,
    ap_materno,
    telefono,
  });
  telVerificar.save();
  res.render("hotel/gerente/modificargerente", {
    pagina: "Usuario se registro exitosamente",
    vista: true,
  });
};

async function validacionFormulario(req) {
  await check("nombre")
    .notEmpty()
    .withMessage("Nombre no debe ser vacio")
    .run(req);
  await check("ap_paterno")
    .notEmpty()
    .withMessage("Apeliido paterno no debe ser vacio")
    .run(req);
  await check("ap_materno")
    .notEmpty()
    .withMessage("Apellido materno no debe ser vacio")
    .run(req);
  await check("telefono")
    .notEmpty()
    .withMessage("Telefono no debe ser vacio")
    .run(req);
  let salida = validationResult(req);
  return salida;
}

export {
  modificarGerente,
  accionbuscarHotelGerente,
  accionLlenarFormulario,
  registrandoModificar,
};
