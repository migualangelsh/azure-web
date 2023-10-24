import Sequelize from "sequelize";
import db from "../config/db.js";

export const MisDatos = db.define(
  "misdatos",
  {
    dato1: {
      type: Sequelize.STRING
    },
    dato2: {
      type: Sequelize.STRING,
    },
    dato3: {
      type: Sequelize.STRING,
    },
    dato4: {
      type: Sequelize.STRING,
    },
    dato5: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

export default MisDatos;