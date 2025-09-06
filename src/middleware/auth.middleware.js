import jwt from 'jsonwebtoken';
import { getDb } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const userCollection = getDb().collection('users');
            
            // Attach the user to the request object, excluding the password
            req.user = await userCollection.findOne(
                {
                    _id: new ObjectId(decoded.userId)
                },
                {
                    // The projection excludes the password field
                    projection: {
                        password: 0 
                    }
                }
            );

            if (!req.user) {
                return res.status(401).json(
                    {
                        message: 'User not found.'
                    }
                );
            }

            next();
        } catch (error) {
            return res.status(401).json(
                {
                    message: 'Not authorized, token failed.'
                }
            )
        }
    }

    if (!token) {
        return res.status(401).json(
            {
                message: 'Not authorized, no token.'
            }
        );
    }
};