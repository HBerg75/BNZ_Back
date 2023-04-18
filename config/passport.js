// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user'); // Ton modèle de données utilisateur

// passport.use(new LocalStrategy({
//     usernameField: 'email' // Remplace 'username' par 'email' pour l'authentification
// }, (email, password, done) => {
//     User.findOne({ email: email }, (err, user) => {
//         if (err) { return done(err); }
//         if (!user) {
//             return done(null, false, { message: 'Adresse email non enregistrée' });
//         }
//         user.comparePassword(password, (err, isMatch) => { // Vérification du mot de passe
//             if (err) { return done(err); }
//             if (!isMatch) {
//                 return done(null, false, { message: 'Mot de passe incorrect' });
//             }
//             return done(null, user);
//         });
//     });
// }));


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email', // Le champ utilisé pour l'email
    passwordField: 'password', // Le champ utilisé pour le mot de passe
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Cet email n\'existe pas.' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return done(null, false, { message: 'Le mot de passe est incorrect.' });
        }

        done(null, user);
    } catch (err) {
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});
