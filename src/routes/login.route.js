const express = require('express');

// Declaramos la vriable router
const router = express.Router();
const model = require('../models/user.model');

router.get('/', function (request, response) {
  if (request.isAuthenticated()) {
    if (request.user.type === 'Admin') {
      response.redirect('/Aprofile/admin');
    } else if (request.user.type === 'Creador') {
      response.redirect('/profile/creator');
    } else if (request.user.type === 'Lector') {
      response.redirect('/profile/reader');
    }
  } else {
    response.render('login', { errors: [] });
  }
});

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
      errors: [{ msg: 'Invalid credentials provided' }],
    });
  }
});

router.post('/logout', function (request, response) {
  request.logOut();
  response.redirect('/login');
});

module.exports = router;
