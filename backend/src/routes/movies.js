import express from "express";
import moviesController from "../controllers/moviesController.js";
import multer from "multer"; 


// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

const upload = multer({dest: "public/"})


router
  .route("/")
  .get(moviesController.getmovies)
  .post(upload.single("image"), moviesController.createmovies);

router
  .route("/:id")
  .put(upload.single("image"), moviesController.updatemovies)
  .delete(moviesController.deletemovies);

export default router;


