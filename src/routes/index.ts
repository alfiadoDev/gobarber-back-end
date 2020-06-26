import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import userRoute from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.use('/users', userRoute);

export default routes;
