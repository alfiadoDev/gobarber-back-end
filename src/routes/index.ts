import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import userRoute from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.use('/users', userRoute);

routes.use('/sessions', sessionRouter);

export default routes;
