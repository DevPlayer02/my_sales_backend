import productsRouter from '@modules/products/routes/ProductsRoutes';
import avatarRouter from '@modules/users/routes/AvatarRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import express, { Router, Request, Response } from 'express';
import uploadConfig from '@config/upload';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import customersRouter from '@modules/customers/routes/customerRoutes';
import ordersRouter from '@modules/orders/routes/OrdersRoutes';

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
