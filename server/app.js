import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ extended: false, limit: '30mb' }));
// app.use(cors());
app.use(compression());
app.use(cookieParser());
app.disable('x-powered-by');

app.set('port', process.env.PORT || 4000);


app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/user', userRoutes);



mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(app.get('port'),
        () => console.log(`The server running on http://localhost:${app.get('port')}`)))
    .catch((error) => console.log(error.message));


