import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from './middlewares';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import 'dotenv/config';
import favicon from 'serve-favicon';

const app: Application = express();

app.use(favicon('public/images/favicon.ico'));

const dbUri = process.env.MONGODB_URI || ' ';
mongoose
  .connect(dbUri)
  .then(() => {
    console.log('db connection result');
    app.listen(3000);
  })
  .catch((err) => {
    console.log('db connection error', err);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(Logger);
app.use(morgan('dev'));

// Middleware setup && static files
app.use(express.static(`public`));

app.get('/', (req: Request, res: Response): void => {
  res.redirect('/blogs');
});

app.get('/about', (req: Request, res: Response): void => {
  res.render('about', { title: 'About' });
});

// Blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req: Request, res: Response): void => {
  // res.status(404).sendFile(`./views/html/404.html`, { root: __dirname });
  res.status(404).render('404', { title: 'Oopsie' });
});
