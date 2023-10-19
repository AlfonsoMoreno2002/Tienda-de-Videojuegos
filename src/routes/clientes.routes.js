import { pool } from "../db.js";

import { addClientes, getCliente, getClientes, deleteCliente, updateCliente } from "../controllers/clientes.controllers.js";

import { Router } from "express";

const clienteRouter = Router();

clienteRouter.get("/clientes", getClientes);

clienteRouter.get("/clientes/:id", getCliente);

clienteRouter.post("/clientes", addClientes);

clienteRouter.delete('/clientes/:id',deleteCliente);

clienteRouter.patch('/clientes/:id',updateCliente);

export default clienteRouter;