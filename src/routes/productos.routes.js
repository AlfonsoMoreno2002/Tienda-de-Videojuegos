import { pool } from "../db.js";

import { addProducto, getProducto, getProductos, deleteProducto, updateProducto } from "../controllers/productos.controllers.js";

import { Router } from "express";

const productoRouter = Router();

productoRouter.get("/productos", getProductos);

productoRouter.get("/productos/:id", getProducto);

productoRouter.post("/productos", addProducto);

productoRouter.delete('/productos/:id',deleteProducto);

productoRouter.patch('/productos/:id',updateProducto);

export default productoRouter;
