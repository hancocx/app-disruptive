const pkg = require('./package.json');
const express = require('express');
const dotenv = require('dotenv');

// Settings
app.set('pkg', pkg);

// Importar rutas
//import categoriesRoutes from './routes/categories.routes';

// 1.- Invocamos a Express
const app = express();

// 2.- Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 3.- Invocamos a dotenv
dotenv.config({ path: './env/.env' });

// 4.- Seteamos el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
// console.log(__dirname)

// 5.- Establezca el EJS como motor de vista
app.set('view engine', 'ejs');

// 6.- Invocamos a bcrypt
const bcryptjs = require('bcryptjs');

// 7.- Variables de sesión
const session = require('express-session');
app.use(
  session({
    secret: 'MyWordSecret',
    resave: true,
    saveUninitialized: true,
  })
);

/* Vinculamos el archivo de enrutamiento de inicio
de sesión con el punto final de inicio de sesión */
app.set('views', 'views');

// Arranca el servidor
app.listen(3000, (res, req) => {
  console.log('Server listening on port');
  // console.log('Server is listening on port: ' + process.env.SERVER_PORT);
});

// Middlewares
// app.use(morgan('dev'));

// Variables globales

// Rutas
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    autor: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

// app.use('/categories', categoriesRoutes);

//export default app;
