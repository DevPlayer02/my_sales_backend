import productsRouter from '@modules/products/routes/ProductsRoutes';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/health', (req: Request, res: Response): void => {
  res.json({ message: 'Hello Dev! I am Alive' });
});

routes.use('/products', productsRouter)

export default routes;