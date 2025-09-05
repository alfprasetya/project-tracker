import { createUser, findUserByEmail } from "../dal/user.dal.js";
import { hashPassword } from "../utils/password.util.js";

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
}