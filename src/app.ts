import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from './middlewares';
import path from 'path';
import morgan from 'morgan';

const app: Application = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/ejs'));

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(Logger);

// Middleware setup && static files
app.use(express.static(`public`));

app.listen(3000);

app.get('/', (req: Request, res: Response): void => {
  const articles = [
    {
      title: 'Article 1',
      content:
        'Cumque vero aliquid sint non dolor voluptatem. Dolorem atque nulla. Consequatur deserunt vel ut a eius at sed occaecati. Aliquam quia similique quia odio. Rerum voluptate ut alias et quis ratione tempora.',
    },
    {
      title: 'Article 2',
      content:
        'Sint voluptates id mollitia provident nostrum. Et est saepe quos. Saepe aut quod beatae id illum officiis quisquam.',
    },
    {
      title: 'Article 3',
      content:
        'Beatae ut officiis vel ad. Maiores ab quia sit tenetur. In dolores a molestias. Consequatur in sed. 4903.25',
    },
  ];
  res.render('index', { title: 'Home', name: req.query?.name || 'lambda person', articles });
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
