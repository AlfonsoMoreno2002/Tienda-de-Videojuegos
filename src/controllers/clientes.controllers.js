import { pool } from "../db.js";

export const addClientes = async (req, res) => {
    //console.log(req.body)
    const { nombre, apellido, email, telefono, direccion } = req.body
    const[data] = await pool.query('INSERT INTO Clientes (nombre, apellido, email, telefono, direccion) VALUES (?,?,?,?,?)',[nombre, apellido, email, telefono, direccion]);
    console.log(data)
    res.send({
      id:data.insertId,
      nombre,
      apellido,
      email,
      telefono,
      direccion
    })
  }

export const getClientes = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Clientes")
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const getCliente = async(req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Clientes WHERE cliente_id=?", [req.params.id])
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message:"Algo salio mal! :( ... Porfavor de verificar"
      })
    }
  }

export const deleteCliente = async (req,res)=>{
  try {
    const[data]= await pool.query("DELETE FROM Clientes WHERE cliente_id=?",[req.params.id])
    if(data.affectedRows<=0)return res.statud (404).json({
      message: "Cliente no encontrado"
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}

export const updateCliente = async(req,res)=>{
  const {id}=req.params //de la url
  const {nombre,apellido,email,telefono,direccion}=req.body //datos enviados 
  try {
    const [result]=await pool.query("UPDATE Clientes SET nombre = IFNULL(?,nombre),apellido=IFNULL(?,apellido),email=IFNULL(?,email),telefono=IFNULL(?,telefono),direccion=IFNULL(?,direccion) WHERE cliente_id=?",[nombre,apellido,email,telefono,direccion,id]);
    if(result.affectedRows===0) return res.status(404).json({
      message:"Cliente no encontrado!"
    })
    const [rows] = await pool.query("SELECT * FROM Clientes WHERE cliente_id=?",[id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message:"Algo salio mal! :( ... Porfavor de verificar"
    })
  }
}