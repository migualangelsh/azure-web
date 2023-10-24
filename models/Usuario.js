import Sequelize from "sequelize";
import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

const Usuario= db.define('usuarios',{
    id_usr: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    confirmar:DataTypes.BOOLEAN,
    token:DataTypes.STRING

},{
    timestamps: false,
    hooks:{
        beforeCreate:async function(usuario){
            const rep=await bcrypt.genSalt(10);
            usuario.password=await bcrypt.hash(usuario.password,rep);
        }
    },
    scopes:{
        elimiarClave:{
            attributes:{
                exclude:['token','password','confirmar']
            }
        }
    }
});
//Metodo prototype
Usuario.prototype.verificandoClave=function(password){
    return bcrypt.compareSync(password,this.password);
}
export default Usuario;
