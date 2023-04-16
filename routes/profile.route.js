const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const auth = require('../utils/auth');

/**
 * Los usuarios pueden acceder a una página con su perfil
 * mientras que los administradores pueden acceder a su
 * perfil y a la lista de usuarios.
 */
router.get(
  '/reader',

  // El middleware checkAuthentication restringe el acceso al rol que le pasemos.
  auth.checkAuthentication('Lector'),
  async function (request, response) {
    let userData = await userModel.read(request.user.alias);
    response.render('profile', {
      user: userData,
      type: 'Lector',
    });
  }
);

router.get(
  '/creator',

  // El middleware checkAuthentication restringe el acceso al rol que le pasemos.
  auth.checkAuthentication('Creador'),
  async function (request, response) {
    let userData = await userModel.read(request.user.alias);
    response.render('profile', {
      user: userData,
      type: 'Creador',
    });
  }
);

router.get(
  '/admin',

  // El middleware checkAuthentication restringe el acceso al rol que le pasemos.
  auth.checkAuthentication('Admin'),
  async function (request, response) {
    let userData = await userModel.read(request.user.alias);
    let listData = await userModel.list();
    response.render('profile', {
      user: userData,
      data: listData,
      type: 'Admin',
    });
  }
);

module.exports = router;
