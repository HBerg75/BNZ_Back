const User = require('../models/User');
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, address, phoneNumber, role, postalCode, city, country } = req.body;
    const user = await User.create({ firstName, lastName, email, password, address, phoneNumber, role, postalCode, city, country });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Inscription réussie!' });
    });
  } catch (err) {
    return next(err);
  }
};


exports.login =  (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: 'Adresse e-mail ou mot de passe incorrect.' }, { message: info.message});
      req.logIn(user, (err) => {
        if (err) return next(err);
        const token = user.generateAuthToken();
        return res.json({ message: 'Connexion réussie!', token: info.token, });
      });
    })(req, res, next);
  };
  
  exports.getSessionData = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      res.status(200).json({...user });
    })(req, res, next);
  };
  

// exports.login = passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// });

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/home');
};
