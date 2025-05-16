import express from "express";
import employeesController from "../controllers/employeesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(employeesController.getemployees)
  .post(employeesController.createemployees);

router
  .route("/:id")
  .put(employeesController.updateemployees)
  .delete(employeesController.deleteemployees);

export default router;


