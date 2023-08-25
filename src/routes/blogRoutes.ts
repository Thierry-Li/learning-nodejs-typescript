import express, { Request, Response } from 'express';
import { blogController } from '../controllers/blogController';

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
  blogController.blog_index(req, res);
});

router.post('/', (req: Request, res: Response): void => {
  blogController.blog_create_post(req, res);
});

router.get('/create', (req: Request, res: Response): void => {
  blogController.blog_create_get(req, res);
});

router.get('/:id', (req: Request, res: Response): void => {
  blogController.blog_details(req, res);
});

router.delete('/:id', (req: Request, res: Response): void => {
  blogController.blog_delete(req, res);
});

export default router;
