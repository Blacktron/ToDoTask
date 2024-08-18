'use strict';

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import todoRouter from './routes/v1/todo.js';
import authenticateRouter from './routes/v1/authenticate.js';

dotenv.config();

const { MONGO_URI } = process.env;
if (MONGO_URI) {
    mongoose.connect(MONGO_URI).then(() => console.log('DB Connected!'));
} else {
    console.log('MongoDB URI is undefined');
    process.exit(1);
}

const app = express();

app.use(express.json());

app.use('/v1/todo', todoRouter);
app.use('/v1/auth', authenticateRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});