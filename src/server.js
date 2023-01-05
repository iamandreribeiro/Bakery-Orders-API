import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clientsRoute from "./routes/clientsRoute.js";
import cakesRoute from "./routes/cakesRoute.js";
import ordersRoute from "./routes/ordersRoute.js";


const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use(clientsRoute);
app.use(cakesRoute);
app.use(ordersRoute);

const port = process.env.PORT;

app.listen(port, console.log(`Server running in PORT:${port}`));