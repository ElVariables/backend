const { MongoClient } = require('mongodb');

function dbClient() {
    const url = process.env.MONGODB;
    if (!url) {
        throw new Error('Invalid Credentials');
    }

    return new MongoClient(url);
}
async function dbGetData(database, collection, query) {
    const client = get_client();
    await client.connect();
    const data = [];

    const db = await client.db(database);
    const cursor = await db.collection(collection).find(query);
    await cursor.forEach((document) => {
        data.push(document);
    });
    client.close();
    return data;
}
async function dbInsertOne(database, collection, data) {
    const client = get_client();
    await client.connect();
    const db = await client.db(database);
    await db.collection(collection).insertOne(data);
    client.close();
    return true;
}
module.exports = { dbGetData, dbClient, dbInsertOne };
