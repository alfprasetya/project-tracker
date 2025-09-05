import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let db;

export const connectToServer = async () => {
    try {
        await client.connect();
        db = client.db('project-tracker');

        console.log('Successfully connected to DB');

    } catch (error) {
        console.error('Failed to connect to DB', error);

        process.exit(1);
    }
};

export const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDb first.');
    }

    return db;
};
