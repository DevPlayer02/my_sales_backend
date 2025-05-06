import productsRouter from '@modules/products/routes/ProductsRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/health', (req: Request, res: Response): void => {
  res.json({ message: 'Hello Dev! I am Alive' });
});

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;