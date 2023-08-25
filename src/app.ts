import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from './middlewares';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Blog from './models/blogs';

const app: Application = express();

const dbUri =
  'mongodb+srv://mongo:7rkIOX9iJmeLcpRZ@mongo-learning.dkyha7g.mongodb.net/nodejs-typescript?retryWrites=true&w=majority';
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

  // res.render('index', { title: 'Home', name: req.query?.name || 'lambda person', articles });
});

app.get('/blogs', (req: Request, res: Response): void => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'Home', name: req.query?.name || 'lambda person', blogs: result });
    })
    .catch((err) => {
      console.log('/blogs Get err', err);
    });
});

app.post('/blogs', (req: Request, res: Response): void => {
  // function with app.use(express.urlencoded({ extended: true }));
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log('/blogs post err', err);
    });
});

app.get('/blogs/create', (req: Request, res: Response): void => {
  // res.redirect('/about');
  res.render('create', { title: 'Create new article' });
});

app.get('/blogs/:id', (req: Request, res: Response): void => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render('details', { title: 'Blog detail', blog: result });
    })
    .catch((err) => {
      console.log('/blogs/:id err', err);
    });
});

app.delete('/blogs/:id', (req: Request, res: Response): void => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log('/blogs/:id  delete err', err);
    });
});

app.get('/about', (req: Request, res: Response): void => {
  res.render('about', { title: 'About' });
});

app.use((req: Request, res: Response): void => {
  // res.status(404).sendFile(`./views/html/404.html`, { root: __dirname });
  res.render('404', { title: 'Oopsie' });
});
