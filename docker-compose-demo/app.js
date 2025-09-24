const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const mongoUrl = 'mongodb://mongo:27017';
const port = 3000;

app.get('/', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db('testdb');
    const time = new Date();
    await db.collection('visits').insertOne({ time });
    const count = await db.collection('visits').countDocuments();
    res.send(`Hello! You are visitor #${count}`);
  } catch (err) {
    res.status(500).send('Database error');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
