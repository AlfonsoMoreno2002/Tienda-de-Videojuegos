import { pool } from "../db.js";

import { addVentas, getVenta, getVentas, deleteVenta, updateVenta } from "../controllers/ventas.controllers.js";

import { Router } from "express";

const ventaRouter = Router();

ventaRouter.get("/ventas", getVentas);

ventaRouter.get("/ventas/:id", getVenta);

ventaRouter.post("/ventas", addVentas);

ventaRouter.delete('/ventas/:id',deleteVenta);

ventaRouter.patch('/ventas/:id',updateVenta);

export default ventaRouter;