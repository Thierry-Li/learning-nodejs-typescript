import { Request, Response } from 'express';
import Blog from '../models/blogs';

const blog_index = function (req: Request, res: Response): void {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs/index', { title: 'Home', name: req.query?.name || 'lambda person', blogs: result });
    })
    .catch((err) => {
      console.log('/blogs Get err', err);
    });
};

const blog_create_post = function (req: Request, res: Response): void {
  const blog = new Blog(req.body);

  blog
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('/blogs post err', err);
    });
};

const blog_create_get = function (_req: Request, res: Response): void {
  res.render('blogs/create', { title: 'Create new article' });
};

const blog_details = function (req: Request, res: Response): void {
  const { id } = req.params;

  Blog.findById(id)
    .then((result) => {
      res.render('blogs/details', { title: 'Blog detail', blog: result });
    })
    .catch((err) => {
      console.log('/blogs/:id err', err);
      res.status(404).render('404', { title: 'Blog not found' });
    });
};

const blog_delete = function (req: Request, res: Response): void {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log('/blogs/:id  delete err', err);
    });
};

// export { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete };
export const blogController = { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete };
