const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

const router = express.Router();

router.get('/api/gifts', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('gifts').find({}).toArray();
    res.json(gifts);
  } catch (error) {
    next(error);
  }
});

router.get('/api/gifts/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(req.params.id) });
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    res.json(gift);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
