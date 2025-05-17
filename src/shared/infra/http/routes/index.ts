import productsRouter from '@modules/products/infra/http/routes/ProductsRoutes';
import express, { Router, Request, Response } from 'express';
import uploadConfig from '@config/upload';
import usersRouter from '@modules/users/infra/http/routes/UserRoutes';
import sessionsRouter from '@modules/users/infra/http/routes/SessionRoutes';
import avatarRouter from '@modules/users/infra/http/routes/AvatarRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import customersRouter from '@modules/customers/infra/http/routes/customerRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';

const routes = Router();

routes.get('/health', (req: Request, res: Response): void => {
  res.json({ message: 'Hello Dev! I am Alive' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/avatars', avatarRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
