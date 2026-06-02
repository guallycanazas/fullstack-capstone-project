const express = require('express');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const existing = await users.findOne({ email: req.body.email });
    if (existing) return res.status(409).json({ message: 'User already exists' });

    const result = await users.insertOne(req.body);
    const token = jwt.sign({ id: result.insertedId, email: req.body.email }, process.env.JWT_SECRET || 'dev-secret');
    res.status(201).json({ token, user: { id: result.insertedId, email: req.body.email } });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev-secret');
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

router.patch('/profile', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const currentUser = await db.collection('users').findOne({ email: req.body.currentEmail });
    if (!currentUser) return res.status(404).json({ message: 'User not found' });

    const updated = await db.collection('users').findOneAndUpdate(
      { email: req.body.currentEmail },
      { $set: { name: req.body.name, email: req.body.email } },
      { returnDocument: 'after' }
    );
    res.json(updated.value);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
