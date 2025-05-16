/*
    Campos:
    jejej
*/

import { Schema, model } from "mongoose";
import multer from "multer"; 

const moviesSchema = new Schema(
  {
    titulo: {
      type: String,
      require: true,
    },

    descripcion: {
      type: String,
    },

    director: {
      type: Date,
      require: true,
      min: 0,
    },

    genero: {
        type: String,
        require: true,
      },


    anio: {
        type: Number,
        require: true,
        min: 8,
      },

      duracion: {
        type: Number,
        require: true,
        min: 8,
      },

      image: {
        type: String,
        require: true,
      },
     
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("movies", moviesSchema);
