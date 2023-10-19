import { pool } from "../db.js";

export const addDetalleVentas = async (req, res) => {
    const { venta_id, producto_id, cantidad, precio_unitario } = req.body;
  
    const [ventExists] = await pool.query('SELECT * FROM Ventas WHERE venta_id = ?', [venta_id]);
    // Primero, verifica si el producto_id existe en la tabla Productos
    const [productExists] = await pool.query('SELECT * FROM Productos WHERE producto_id = ?', [producto_id]);
  
    if (productExists.length === 0 || ventExists.length ===0) {
      // El producto_id no existe en la tabla Productos
      res.status(404).send('El ID de la venta o el producto con el ID proporcionado no existe.');
    } else {
      // El producto_id existe, por lo que podemos insertar el detalle de venta
      const [data] = await pool.query('INSERT INTO DetalleVentas (venta_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)', [venta_id, producto_id, cantidad, precio_unitario]);
      
      res.send({
        id: data.insertId,
        venta_id,
        producto_id,
        cantidad,
        precio_unitario
      });
    }
  }
  
export const getDetalleVentas = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM DetalleVentas")
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const getDetalleVenta = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM DetalleVentas WHERE id=?", [req.params.id])
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const deleteDetalleVenta = async (req,res)=>{
  try {
    const[data]= await pool.query("DELETE FROM DetalleVentas WHERE id=?",[req.params.id])
    if(data.affectedRows<=0)return res.statud (404).json({
      message: "Detalles Venta no encontrados"
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}

export const updateDetalleVenta = async(req,res)=>{
  const {id}=req.params //de la url
  const {venta_id, producto_id, cantidad, precio_unitario}=req.body //datos enviados 
  try {
    const [result]=await pool.query("UPDATE DetalleVentas SET venta_id = IFNULL(?,venta_id),producto_id=IFNULL(?,producto_id),cantidad=IFNULL(?,cantidad),precio_unitario=IFNULL(?,precio_unitario) WHERE id=?",[venta_id,producto_id,cantidad,precio_unitario,id]);
    if(result.affectedRows===0) return res.status(404).json({
      message:"Detalles de Venta no encontrados!"
    })
    const [rows] = await pool.query("SELECT * FROM DetalleVentas WHERE id=?",[id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}