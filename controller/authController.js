const User = require('../models/user');
const passport = require('passport');

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
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.json({ message: 'Connexion réussie!', user: user });
      });
    })(req, res, next);
  };
  

// exports.login = passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// });

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
