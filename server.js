import 'dotenv/config';
import express from 'express';
import { connectToServer } from './src/config/database.js';
import authRoutes from './src/api/auth.routes.js';
import userRoutes from './src/api/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json(
        {
            message: 'Welcome to the Project Tracker API!'
        }
    );
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
    try {
        await connectToServer();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error('Failed to start the server', error);
        process.exit(1);
    }
};

startServer();