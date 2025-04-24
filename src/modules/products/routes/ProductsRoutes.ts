import { Router } from 'express';
import ProductsControllers from '../controllers/ProductsControllers';

const productsRouter = Router();

productsRouter.get('/', ProductsControllers.index);
productsRouter.get('/:id', ProductsControllers.show);
productsRouter.post('/', ProductsControllers.create);
productsRouter.put('/:id', ProductsControllers.update);
productsRouter.delete('/:id', ProductsControllers.delete);

export default productsRouter;