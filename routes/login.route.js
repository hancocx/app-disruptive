const express = require('express');

// Declaramos la vriable router
const router = express.Router();
const model = require('../models/user.model');

/**
 * El método get muestra la página de inicio de sesión o, s
 * si el usuario está autenticado, redirige a la página de perfil.
 */
router.get('/', function (request, response) {
  if (request.isAuthenticated()) {
    if (request.user.type === 'Admin') {
      response.redirect('/profile/admin');
    } else if (request.user.type === 'Creador') {
      response.redirect('/profile/creator');
    } else if (request.user.type === 'Lector') {
      response.redirect('/profile/reader');
    }
  } else {
    response.render('login', { errors: [] });
  }
});

/**
 * El método post comprueba si las credenciales son
 * válidas y si lo son inicia la sesión del usuario
 * a través de request.login(user).
 */
router.post('/', async function (request, response) {
  areValid = await model.areValidCredentials(
    request.body.username,
    request.body.passw
  );

  if (areValid) {
    user = await model.read(request.body.username);
    await request.login(user, function (err) {});

    if (request.user.role === 'Admin') {
      response.redirect('/profile/admin');
    } else if (request.user.role === 'Creador') {
      response.redirect('/profile/creator');
    } else if (request.user.role === 'Lector') {
      response.redirect('/profile/reader');
    }
  } else {
    response.render('login', {
      errors: [{ msg: 'Invalid credentials provided!' }],
    });
  }
});

/**
 * Incluimos aquí la ruta que permite el cierre de sesión.
 * Llamamos a request.logOut().
 */
router.post('/logout', function (request, response) {
  request.logOut();
  response.redirect('/login');
});

module.exports = router;
