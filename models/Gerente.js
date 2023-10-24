import Sequelize from "sequelize";
import db from "../config/db.js";
import Hotel from "./Hotel.js";
export const Gerente = db.define(
  "gerentes",
  {
    id_grt: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    ap_paterno: {
      type: Sequelize.STRING,
    },
    ap_materno: {
      type: Sequelize.STRING,
    },
    telefono: {
      type: Sequelize.STRING,
    },
    id_htl: {
      type: Sequelize.INTEGER,
    },
  },
  { timestamps: false }
);
Hotel.hasOne(Gerente, {
  foreignKey: {
    name: "id_htl",
  },
});
Gerente.belongsTo(Hotel, {
  foreignKey: {
    name: "id_htl",
  },
});

export default Gerente;