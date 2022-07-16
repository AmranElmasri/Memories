import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './database/config/db.js'
import colors from 'colors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();


connectDB();
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  // because __dirname is not defined in ES module scope


if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => {
        res.send('The server is running..');
    });
};

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
};


// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(app.get('port'),
//         () => console.log(`The server running on http://localhost:${app.get('port')}`)))
//     .catch((error) => console.log(error.message));


export default app;
