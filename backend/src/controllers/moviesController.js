//Array de metodos (C R U D)
const moviesController = {};
import moviesModel from "../models/movies.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";


cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// SELECT
moviesController.getmovies = async (req, res) => {
  const movies = await moviesModel.find();
  res.json(movies);
};

// INSERT
moviesController.createmovies = async (req, res) => {
  const { titulo, descripcion, director, genero, anio, duracion} = req.body;

  let imageURL = "";

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["png", "jpg", "jpeg"],
    });
    //Guardo en la variable la URL de donde se subió la imagen
    imageURL = result.secure_url;
     
  }
   const newmovies = new moviesModel({ titulo, descripcion, director, genero, anio, duracion, image: imageURL});
  await newmovies.save();
  
  res.json({ message: "movie saved" });
};

// DELETE
moviesController.deletemovies = async (req, res) => {
const deletedmovies = await moviesModel.findByIdAndDelete(req.params.id);
  if (!deletedmovies) {
    return res.status(404).json({ message: "movies dont find" });
  }
  res.json({ message: "movies deleted" });
};

// UPDATE
moviesController.updatemovies = async (req, res) => {
  // Solicito todos los valores
  const {titulo, descripcion, director, genero, anio, duracion, image } = req.body;
  // Actualizo
  await moviesModel.findByIdAndUpdate(
    req.params.id,
    {
        titulo, descripcion, director, genero, anio, duracion, image
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "movies update" });
};

export default moviesController;
