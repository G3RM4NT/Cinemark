import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar

import clientsModel from "../models/customers.js";
import employeesModel from "../models/employees.js";

import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovey.js";
import { config } from "../config.js";
import { verify } from "crypto";

//1- Crear un array de funciones
const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await clientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      userFound = await employeesModel.findOne({ email });
      if (userFound) {
        userType = "employee";
      }
    }

    if (!userFound) {
      res.json({ message: "User not found" });
    }

    //Generar un código un aleatorio
    // (El que se va a enviar)
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    //Guardamos todo en un token
    const token = jsonwebtoken.sign(
      //1-¿Que voy a guardar?
      { email, code, userType, verified: false },
      //2-secret key
      config.JWT.secret,
      //3-¿Cuando expira?
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

    //ULTIMO PASO => enviar el correo con el código
    

    await sendEmail(
      email,
      "You verification code", //Asunto
      "Hello! Remember dont forget your pass", //Cuerpo del mensaje
      HTMLRecoveryEmail(code) //HTML
    );
    res.json({message: "email sending successfully"})

  } catch (error) {
    console.log("error" + error);
  }
};

passwordRecoveryController.verifyCode = async (req, res)=> {

const {code} = req.body;

try {

  const token = req.cookies.tokenRecoveryCode

  // extraer la información

  const decoded = jsonwebtoken.verify(token, config.JWT.secret)
  

  if (decoded.code !== code) {

    return res.json({message: "Invalid code"})
    
  }

  const newToken = jsonwebtoken.sign(

    {email: decoded.email,
      code: decoded.code,
      userType: decoded.userType,
      verified: true
    },

    config.JWT.secret,

    {expiresIn: "20m"}
  )

  res.cookie("tokenRecoveryCode", newToken, {maxAge:20*60*1000})

  res.json({message: "Code verified successfuly"})

} catch (error) {

console.log("error" + error);
  


}


}

export default passwordRecoveryController;
