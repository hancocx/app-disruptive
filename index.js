const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Inicializa la autenticación
const bodyParser = require('body-parser');
const auth = require('./utils/auth');
auth.initialization(app);

// Arranca el servidor
app.listen(process.env.SERVER_PORT, () => {
  //console.log('Server listening on port', app.get('port'));
  console.log('Server is listening on port: ' + process.env.SERVER_PORT);
});

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// Establezca el EJS como motor de vista
app.set('view engine', 'ejs');

/* Vinculamos el archivo de enrutamiento de inicio
de sesión con el punto final de inicio de sesión */
app.set('views', 'views');

// Tipeo de navegación
app.use('/login', require('./routes/login.route'));
app.use('/profile', require('./routes/profile.route'));
