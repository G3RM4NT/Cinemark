import express from "express";
import moviesRoutes from "./src/routes/movies.js";
import cookieParser from "cookie-parser";
import employeesRoutes from "./src/routes/employees.js";
import customersRoutes from "./src/routes/customers.js"
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registerClientRoutes from "./src/routes/registerCustomers.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import registerEmployessRoutes from "./src/routes/registerEmployees.js";
// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//Que postman acepte guardar cookies
app.use(cookieParser());

app.use("/api/movies", moviesRoutes);
app.use("/api/employee", employeesRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/registerEmployees", registerEmployessRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registercustomers", registerClientRoutes);
app.use("/api/recoverypassword", recoveryPasswordRoutes);
export default app;