import jsonwebtoken from "jsonwebtoken"; // Token
import bcryptjs from "bcryptjs"; // Encriptar

import clientsModel from "../models/customers.js";
import employeesModel from "../models/employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovey.js";
import { config } from "../config.js";

// Controlador para recuperación de contraseña
const passwordRecoveryController = {};

// Solicitar código de recuperación
passwordRecoveryController.requestCode = async (req, res) => {
  const { correo } = req.body;

  try {
    if (!correo || typeof correo !== "string" || correo.trim() === "") {
      return res.status(400).json({ message: "Correo inválido o no proporcionado" });
    }

    let userFound = await clientsModel.findOne({ correo });
    let userType;

    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeesModel.findOne({ correo });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const token = jsonwebtoken.sign(
      { correo, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000, httpOnly: true });

    await sendEmail(
      correo,
      "Your verification code",
      "Hello! Remember don't forget your pass",
      HTMLRecoveryEmail(code)
    );

    return res.json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error en requestCode:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Verificar código enviado por el usuario
passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado. Solicita un nuevo código." });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.status(400).json({ message: "Código inválido" });
    }

    const newToken = jsonwebtoken.sign(
      {
        correo: decoded.correo,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000, httpOnly: true });

    return res.json({ message: "Código verificado exitosamente" });
  } catch (error) {
    console.error("Error en verifyCode:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar la contraseña nueva
passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;

    if (!token) {
      return res.status(401).json({ message: "Token no encontrado. Solicita un nuevo código." });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(400).json({ message: "Código no verificado" });
    }

    const { correo, userType } = decoded;

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    let updatedUser;

    if (userType === "client") {
      updatedUser = await clientsModel.findOneAndUpdate(
        { correo },
        { password: hashedPassword },
        { new: true }
      );
    } else if (userType === "employee") {
      updatedUser = await employeesModel.findOneAndUpdate(
        { correo },
        { password: hashedPassword },
        { new: true }
      );
    }

    res.clearCookie("tokenRecoveryCode");

    return res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error("Error en newPassword:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default passwordRecoveryController;
