import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar el transporter
// ¿Quien envía el correo?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

// ¿Quien lo envia?
const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from: "gonzagerman924@gmail.com",
      to, // Para quien
      subject, // El asunto
      body, //Cuerpo del mensaje
      html, //HTML
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

// Función para generar el HTML del correo de recuperación de contraseña
const HTMLRecoveryEmail = (code) => {
  return `
     <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px;">Cinemark</h1>
        <p style="font-size: 16px; color: #b22222; line-height: 1.5;">
          Hello, we received a request to reset your password. Use the verification code below to proceed:
        </p>
        <div style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background-color: #b22222; border-radius: 5px; border: 1px solid #e67e22;">
          ${code}
        </div>
        <p style="font-size: 14px; color:#b22222; line-height: 1.5;">
          This code is valid for the next <strong>15 minutes</strong>. If you didn’t request this email, you can safely ignore it.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer style="font-size: 12px; color:#b22222;">
          If you need further assistance, please contact our support team at 
          <a href="mailto:support@example.com" style="color: #b22222; text-decoration: none;">gonzagerman924@gmail.com</a>.
        </footer>
      </div>
    `;
};

export { sendEmail, HTMLRecoveryEmail };
