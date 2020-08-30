import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';

const providersRoute = Router();

const providerController = new ProviderController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providerController.index);

export default providersRoute;
