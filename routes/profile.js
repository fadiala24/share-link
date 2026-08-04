const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET current profile
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Aucun profil trouvé.' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// PUT update profile
router.put('/', async (req, res) => {
  try {
    const { name, logoUrl, subtitle, backgroundColor } = req.body;
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile({ name, logoUrl, subtitle, backgroundColor });
    } else {
      if (name !== undefined) profile.name = name;
      if (logoUrl !== undefined) profile.logoUrl = logoUrl;
      if (subtitle !== undefined) profile.subtitle = subtitle;
      if (backgroundColor !== undefined) profile.backgroundColor = backgroundColor;
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
