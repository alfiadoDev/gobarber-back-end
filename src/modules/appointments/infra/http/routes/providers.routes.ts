import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';

const providersRoute = Router();

const providerController = new ProviderController();
const monthAvailabilityController = new MonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', providerController.index);
providersRoute.get(
  '/:provider_id/month-availability',
  monthAvailabilityController.index,
);
providersRoute.get(
  '/:provider_id/day-availability',
  dayAvailabilityController.index,
);

export default providersRoute;
