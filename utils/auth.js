/**
 * importando el módulo express-session que permite almacenar
 * sesiones en el lado del servidor con el cliente recibiendo
 * una cookie con el id de sesión.
 */
const session = require('express-session');
const passport = require('passport');
const usersModel = require('../models/user.model');
module.exports = {
  initialization(app) {
    app.use(
      session({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    /*
     * La función serializeuser del pasaporte, elegimos qué
     * información de usuario queremos almacenar en la sesión.
     */
    passport.serializeUser(function (user, done) {
      done(null, user.alias);
    });

    /* 
    * La función deserielizeduser, el objeto de usuario
    * completo se recupera posteriormente de la base de datos
    /* y se guarda en request.user.
     */
    passport.deserializeUser(async function (alias, done) {
      let user = await usersModel.read(alias);
      done(null, user);
    });
  },

  /**
   * La función checkAuthentication es un middleware de
   * autorización basado en roles donde el rol puede ser
   * pasado a nivel de ruta y comparado con el rol del
   * usuario almacenado en request.user.
   * @param {*} role
   * @returns
   */
  checkAuthentication(role) {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        if (role) {
          if (role === request.user.role) {
            return next();
          } else {
            console.log('inglobalsecure');
            return response.end('401 Unautorized');
          }
        } else {
          return next();
        }
      } else {
        console.log('globalsecurenotauthenticated');
        response.redirect('/login');
      }
    };
  },
};
