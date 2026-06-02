const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db('giftlink');
  }
  return db;
}

module.exports = { connectToDatabase, client };
