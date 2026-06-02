const express = require('express');
const { connectToDatabase } = require('../db');

const router = express.Router();

router.get('/api/search', async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const { category, q } = req.query;
    const query = {};

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }

    const results = await db.collection('gifts').find(query).toArray();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
