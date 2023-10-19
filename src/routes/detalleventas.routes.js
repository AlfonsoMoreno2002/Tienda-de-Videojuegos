import { pool } from "../db.js";

import { addDetalleVentas, getDetalleVenta, getDetalleVentas, deleteDetalleVenta, updateDetalleVenta } from "../controllers/detalleventas.controllers.js";

import { Router } from "express";

const DetalleVentasRouter = Router();

DetalleVentasRouter.get("/detalleventas", getDetalleVentas);

DetalleVentasRouter.get("/detalleventas/:id", getDetalleVenta);

DetalleVentasRouter.post("/detalleventas", addDetalleVentas);

DetalleVentasRouter.delete('/detalleventas/:id',deleteDetalleVenta);

DetalleVentasRouter.patch('/detalleventas/:id',updateDetalleVenta);

export default DetalleVentasRouter;