import { registerUserService } from "../services/auth.service.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json(
                {
                    message: 'All fields are required'
                }
            )
        }

        const newUser = await registerUserService({ username, email, password });

        res.status(201).json(
            {
                message: 'User registered successfully!',
                user: newUser
            }
        )
    } catch (error) {
        // user already exists
        if (error.message.includes('already exists')) {
            return res.status(409).json(
                {
                    message: error.message
                }
            )
        }

        // other errors
        res.status(500).json(
            {
                message: 'Error registering user',
                error: error.message
            }
        )
    }
};