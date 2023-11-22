import express from "express";
import productoRouter from "./routes/productos.routes.js"
import clienteRouter from "./routes/clientes.routes.js";
import ventaRouter from "./routes/ventas.routes.js";
import DetalleVentasRouter from "./routes/detalleventas.routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors()); // Esta línea desactiva CORS, colócala al principio para que se aplique a todas las rutas
app.use('/api', productoRouter);
app.use('/api', clienteRouter);
app.use('/api', ventaRouter);
app.use('/api', DetalleVentasRouter);

// Manejo de errores cuando la ruta no es encontrada 
app.use((req, res, next) => {
  res.status(404).json({
    message: "Algo salió mal!! :( Por favor, verificarlo"
  });
});

export default app;
