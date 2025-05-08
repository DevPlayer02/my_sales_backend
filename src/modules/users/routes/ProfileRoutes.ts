import { Router } from 'express';
import ProfileController from '../controllers/ProfileControllers';
import AuthMiddleware from '@shared/middlewares/authMiddleware';
import { UpdateUserSchema } from '../schemas/UpdateUserSquema';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(AuthMiddleware.execute)
profileRouter.get('/', profileController.show);
profileRouter.patch('/', UpdateUserSchema, profileController.update);

export default profileRouter;