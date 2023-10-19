import { pool } from "../db.js";

export const addVentas = async (req, res) => {
    const { cliente_id, fecha_venta } = req.body;
  
    // Verificar si el cliente_id existe antes de insertar
    const [existingClientes] = await pool.query('SELECT * FROM Clientes WHERE cliente_id = ?', [cliente_id]);
  
    if (existingClientes.length === 0) {
      return res.status(404).json({ message: 'El cliente con el ID proporcionado no existe.' });
    }
  
    // El cliente_id existe, proceder a la inserción
    const [data] = await pool.query('INSERT INTO Ventas (cliente_id, fecha_venta) VALUES (?, ?)', [cliente_id, fecha_venta]);
    
    res.status(201).json({
      id: data.insertId,
      cliente_id,
      fecha_venta,
    });
  };  

export const getVentas = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Ventas")
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const getVenta = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Ventas WHERE venta_id=?", [req.params.id])
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const deleteVenta = async (req,res)=>{
  try {
    const[data]= await pool.query("DELETE FROM Ventas WHERE venta_id=?",[req.params.id])
    if(data.affectedRows<=0)return res.statud (404).json({
      message: "Venta no encontrado"
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}

export const updateVenta = async(req,res)=>{
  const {id}=req.params //de la url
  const {cliente_id, fecha_venta}=req.body //datos enviados 
  try {
    const [result]=await pool.query("UPDATE Ventas SET cliente_id = IFNULL(?,cliente_id),fecha_venta=IFNULL(?,fecha_venta) WHERE venta_id=?",[cliente_id,fecha_venta,id]);
    if(result.affectedRows===0) return res.status(404).json({
      message:"Venta no encontrado!"
    })
    const [rows] = await pool.query("SELECT * FROM Ventas WHERE venta_id=?",[id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}