import { getDb } from "../config/database.js";

const COLLECTION_NAME = 'users';

export const getUserCollection = () => {
    return getDb().collection(COLLECTION_NAME);
};

export const createUser = async (userData) => {
    const result = await getUserCollection().insertOne(userData);
    return result;
};

export const findUserByEmail = async (email) => {
    const user = await getUserCollection().findOne(
        {
            email: email
        }
    );

    return user;
};