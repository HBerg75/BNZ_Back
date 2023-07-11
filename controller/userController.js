const User = require('../models/User');
const bcrypt = require('bcrypt');

// Modifier les informations d'un utilisateur
exports.updateUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    postalCode,
    city,
    country,
    currentPassword,
    newPassword,
  } = req.body;

  try {
    const user = await User.findById(req.params.userId);

    // Vérifier que l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si l'email est modifié et qu'il n'est pas déjà utilisé
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email: email });

      if (emailExist) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }
    }

    // Modifier les informations de l'utilisateur
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.address = address;
    user.phoneNumber = phoneNumber;
    user.postalCode = postalCode;
    user.city = city;
    user.country = country;

    // Vérifier si un nouveau mot de passe a été fourni
    if (newPassword) {
      // Vérifier si l'ancien mot de passe fourni correspond à l'actuel
      const isMatch = await user.comparePassword(currentPassword);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Le mot de passe actuel est incorrect." });
      }

      // Crypter le nouveau mot de passe et le sauvegarder
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "Utilisateur modifié avec succès.", user: user });
  } catch (err) {
    next(err);
  }
};

// Obtenir les informations d'un utilisateur spécifique
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.json({ user: user });
  } catch (err) {
    next(err);
  }
};

// Obtenir la liste de tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json({ users: users });
  } catch (err) {
    next(err);
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.remove();

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    next(err);
  }
};
