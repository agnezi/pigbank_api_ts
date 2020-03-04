import { Router } from 'express';
import AuthMiddleware from './middlewares/auth';

import UsersController from './controllers/UsersController';

const routes = Router();

routes.post("/signup", UsersController.store);
routes.post("/signin", UsersController.auth);
//middleware
routes.use("/dashboard", AuthMiddleware.tokenAuth);

export default routes;