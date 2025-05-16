/*
    Campos:
    jejej
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
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

export default model("customers", customersSchema);
