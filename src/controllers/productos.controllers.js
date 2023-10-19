import { pool } from "../db.js";

export const addProducto = async (req, res) => {
    //console.log(req.body)
    const { nombre, descripcion, precio, stock } = req.body
    const[data] = await pool.query('INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES (?,?,?,?)',[nombre, descripcion, precio, stock]);
    console.log(data)
    res.send({
      id:data.insertId,
      nombre,
      descripcion,
      precio,
      stock
    })
  }

export const getProductos = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Productos")
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const getProducto = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Productos WHERE producto_id=?", [req.params.id])
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const deleteProducto = async (req,res)=>{
  try {
    const[data]= await pool.query("DELETE FROM Productos WHERE producto_id=?",[req.params.id])
    if(data.affectedRows<=0)return res.statud (404).json({
      message: "Producto no encontrado"
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}

export const updateProducto = async(req,res)=>{
  const {id}=req.params //de la url
  const {nombre,descripcion,precio,stock}=req.body //datos enviados 
  try {
    const [result]=await pool.query("UPDATE Productos SET nombre = IFNULL(?,nombre),descripcion=IFNULL(?,descripcion),precio=IFNULL(?,precio),stock=IFNULL(?,stock) WHERE producto_id=?",[nombre,descripcion,precio,stock,id]);
    if(result.affectedRows===0) return res.status(404).json({
      message:"Producto no encontrado!"
    })
    const [rows] = await pool.query("SELECT * FROM Productos WHERE producto_id=?",[id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}