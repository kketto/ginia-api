import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import categoriesRoutes from './routes/categories.routes';
import slideRoutes from './routes/slide.routes';
import moviesRoutes from './routes/movies.routes';
import usersRoutes from './routes/users.routes';
const app = express();
createConnection();

// Middlewares
app.use(cors());
// app.use(express.json()); 
app.use(morgan('dev'));


app.get('/', async (req, res) => {
    res.status(404).statusMessage = 'dadad';
    res.json({ keti: 'geniosi' })
})
app.use(express.json())

// routes
app.use(categoriesRoutes);
app.use(slideRoutes);
app.use(moviesRoutes);
app.use(usersRoutes);

app.listen(3000);
console.log('Server on port', 3000);

