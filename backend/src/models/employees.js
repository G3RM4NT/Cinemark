/*
    Campos:
    jejej
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
    },

    correo: {
      type: String,
    },

    contrasenia: {
      type: Date,
      require: true,
      min: 0,
    },

    telefono: {
        type: String,
        require: true,
      },


    direccion: {
        type: String,
        require: true,
      },

      puesto: {
        type: String,
        require: true,
      },

      fecha_contratacion: {
        type: Date,
        require: true,
      },

      salario: {
        type: Number,
        require: true,
      },

      DUI: {
        type: String,
        require: true,
      },
     
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeesSchema);
