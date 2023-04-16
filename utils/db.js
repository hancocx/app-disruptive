// Importar la dependencia
const mysql = require('mysql');

// Conexión a la base de datos
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('¡Conexión éxitosa!');
  }
});

conexion.end();

/* module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      conexion
        .getConnection()
        .then(function (conn) {
          res(conn);
        })
        .catch(function (error) {
          rej(error);
        });
    });
  },
};*/
