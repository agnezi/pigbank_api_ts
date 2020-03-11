import { Router } from 'express';
import AuthMiddleware from './middlewares/auth';

import UsersController from './controllers/UsersController';
import EarningsController from './controllers/EarningsController';

const routes = Router();

routes.post("/signup", UsersController.store);
routes.post("/signin", UsersController.auth);

//middleware
routes.use("/earnings", AuthMiddleware.tokenAuth);
routes.post("/earnings/create_earning", EarningsController.store);
routes.get("/earnings/:user_id/all", EarningsController.index);
routes.put("/earnings/:user_id/update_earning", EarningsController.update);
routes.delete("/earnings/:user_id/delete_earning/:earning_id", EarningsController.delete)

export default routes;