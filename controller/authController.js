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

exports.login = passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
