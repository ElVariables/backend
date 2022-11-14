const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB;

const client = new MongoClient(uri);

async function handleDatabase() {
    await client.connect();
    console.log('Success');
    const db = client.db('App');
    const users = db.collection('users');
    return 'Connected DB';
}

module.exports = { handleDatabase };
