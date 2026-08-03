const express = require('express');
const router = express.Router();
const Platform = require('../models/Platform');

// GET all active platforms sorted by order
router.get('/', async (req, res) => {
  try {
    const platforms = await Platform.find({ active: true }).sort({ order: 1 });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET all platforms (including inactive) — for admin
router.get('/all', async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ order: 1 });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// GET single platform by id
router.get('/:id', async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ message: 'Plateforme non trouvée.' });
    }
    res.json(platform);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// POST create a new platform
router.post('/', async (req, res) => {
  try {
    const { name, label, url, type, iconColor, order, active } = req.body;

    if (!name || !label || !url || !type) {
      return res.status(400).json({ message: 'name, label, url et type sont obligatoires.' });
    }

    const platform = new Platform({ name, label, url, type, iconColor, order, active });
    await platform.save();
    res.status(201).json(platform);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// PUT update a platform
router.put('/:id', async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform) {
      return res.status(404).json({ message: 'Plateforme non trouvée.' });
    }

    const fields = ['name', 'label', 'url', 'type', 'iconColor', 'order', 'active'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) platform[field] = req.body[field];
    });

    await platform.save();
    res.json(platform);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

// DELETE a platform
router.delete('/:id', async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform) {
      return res.status(404).json({ message: 'Plateforme non trouvée.' });
    }
    res.json({ message: 'Plateforme supprimée.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur.', error: err.message });
  }
});

module.exports = router;
