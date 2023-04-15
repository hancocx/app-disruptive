/**
 * En cada función, solicitamos una nueva conexión desde el pool
 * de conexiones, y después de obtener los datos cerramos la conexión.
 */
const pool = require('../utils/db.js');

module.exports = {
  // LA función Read, se utiliza para obtener la información del usuario
  async read(alias) {
    try {
      conn = await pool.getConnection();
      sql = 'SELECT user_id,alias,email,role FROM user WHERE alias = ?';
      const rows = await conn.query(sql, alias);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  // La función List, para obtener una lista de todos los usuarios.
  async list() {
    try {
      conn = await pool.getConnection();
      sql = 'SELECT user_id,alias,email,role FROM user';
      const rows = await conn.query(sql);
      conn.end();
      return rows;
    } catch (err) {
      throw err;
    }
  },

  // La función areValidCredentials, para comprobar si las credenciales de inicio de sesión son correctas
  async areValidCredentials(alias, password) {
    try {
      conn = await pool.getConnection();
      sql = 'SELECT password FROM user WHERE alias = ?';
      const rows = await conn.query(sql, alias);

      // Cerramos la conexión
      conn.end();

      if (rows.length == 1 && rows[0].password === password) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },
};
