import { createPool } from "mysql2/promise";

//Realizar conexion a la BD

export const pool = createPool({
    host:"localhost",
    user:"root",
    password:"Alfonso",
    port:"3306",
    database:"tienda"
})