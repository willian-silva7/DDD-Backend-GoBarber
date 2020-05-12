import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticateed from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/usersController';
import UserAvatarController from '../controllers/userAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

// atualizar informação única
usersRouter.patch(
  '/avatar',
  ensureAuthenticateed,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
