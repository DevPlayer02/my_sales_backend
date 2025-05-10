import { Router } from 'express';
import OrdersControllers from '../controllers/OrdersControllers';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import { createOrderValidate, idParamsValidate } from '../schemas/OrdersSchemas';

const ordersRouter = Router();
const ordersController = new OrdersControllers();

ordersRouter.use(AuthMiddleware.execute);
ordersRouter.get('/:id', idParamsValidate, ordersController.show);
ordersRouter.post('/', createOrderValidate, ordersController.create);

export default ordersRouter;