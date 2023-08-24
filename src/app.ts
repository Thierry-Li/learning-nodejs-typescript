import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from './middlewares';
import path from 'path';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(Logger);

app.listen(3000);

app.get('/', (req: Request, res: Response): void => {
  console.log('req.query?.name', req.query?.name);
  res.render('index', { title: 'Home', name: req.query?.name || 'lambda person' });
});

app.get('/about', (req: Request, res: Response): void => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req: Request, res: Response): void => {
  // res.redirect('/about');
  res.render('create', { title: 'Create new article' });
});

app.use((req: Request, res: Response): void => {
  // res.status(404).sendFile(`./views/html/404.html`, { root: __dirname });
  res.render('404', { title: 'Oopsie' });
});
