// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
  
//       if (!user) {
//         return res.status(400).json({ message: info.message });
//       }
  
//       req.logIn(user, (err) => {
//         if (err) {
//           return next(err);
//         }
  
//         return res.status(200).json({ user });
//       });
//     })(req, res, next);
//   });