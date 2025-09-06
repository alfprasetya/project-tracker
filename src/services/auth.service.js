import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from "../dal/user.dal.js";
import { comparePassword, hashPassword } from "../utils/password.util.js";

export const registerUserService = async (userData) => {
    const { username, email, password } = userData;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('User with this email already exists.');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    };

    await createUser(newUser);

    return {
        username, email
    };
};

export const loginUserService = async (loginData) => {
    const { email, password } = loginData;

    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials.')
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid credentials.');
    }

    const tokenPayload = {
        userId: user._id,
        email: user.email
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return {
        user: {
            username: user.username,
            email: user.email
        },
        token,
    };
};