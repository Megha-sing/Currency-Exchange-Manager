const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');

// Create
router.post('/', async (req, res) => {
  try {
    const newCurrency = await Currency.create(req.body);
    res.status(201).json(newCurrency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.json(currencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const currency = await Currency.findById(req.params.id);
    if (!currency) return res.status(404).json({ error: 'Currency not found' });
    res.json(currency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedCurrency = await Currency.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCurrency);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Currency.findByIdAndDelete(req.params.id);
    res.json({ message: 'Currency deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
