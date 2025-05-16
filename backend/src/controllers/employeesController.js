//Array de metodos (C R U D)
const employeesController = {};
import employeesModel from "../models/employees.js";

// SELECT
employeesController.getemployees = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};

// INSERT
employeesController.createemployees = async (req, res) => {
  const {nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    DUI } = req.body;
  const newemployees = new employeesModel({ nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    DUI});
  await newemployees.save();
  res.json({ message: "employee saved" });
};

// DELETE
employeesController.deleteemployees = async (req, res) => {
const deletedemployees = await employeesModel.findByIdAndDelete(req.params.id);
  if (!deletedemployees) {
    return res.status(404).json({ message: "employees dont find" });
  }
  res.json({ message: "employees deleted" });
};

// UPDATE
employeesController.updateemployees = async (req, res) => {
  // Solicito todos los valores
  const {nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    puesto,
    fecha_contratacion,
    salario,
    DUI } = req.body;
  // Actualizo
  await employeesModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        puesto,
        fecha_contratacion,
        salario,
        DUI
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employees update" });
};

export default employeesController;
