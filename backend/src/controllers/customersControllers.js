//Array de metodos (C R U D)
const customersController = {};
import customersModel from "../models/customers.js";

// SELECT
customersController.getcustomers = async (req, res) => {
  const customers = await customersModel.find();
  res.json(customers);
};

// INSERT
customersController.createcustomers = async (req, res) => {
  const {nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    DUI} = req.body;
  const newcustomers = new customersModel({ nombre,
    nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    DUI});
  await newcustomers.save();
  res.json({ message: "employee saved" });
};

// DELETE
customersController.deletecustomers = async (req, res) => {
const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "customers dont find" });
  }
  res.json({ message: "customers deleted" });
};

// UPDATE
customersController.updatecustomers = async (req, res) => {
  // Solicito todos los valores
  const {nombre,
    correo,
    contrasenia,
    telefono,
    direccion,
    DUI } = req.body;
  // Actualizo
  await customersModel.findByIdAndUpdate(
    req.params.id,
    {
        nombre,
        correo,
        contrasenia,
        telefono,
        direccion,
        DUI
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "customers update" });
};

export default customersController;
