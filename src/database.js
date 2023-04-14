// Importar la dependencia
var mysql = require('mysql');

// Conexión a la base de datos
var conexion = mysql.createConnection({
  host: 'localhost',
  database: 'db_disruptive',
  user: 'root',
  password: 'admin',
});

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log('¡Conexión éxitosa!');
  }
});

// Prueba de consulta
/*conexion.query(
  'SELECT `alias`, `rol`, `email`, `created_at` FROM `user`',
  function (error, results, fields) {
    if (error) throw error;

    results.forEach((result) => {
      console.log(result);
    });
  }
);*/

conexion.end();
