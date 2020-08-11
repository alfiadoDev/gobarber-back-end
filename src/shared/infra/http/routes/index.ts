import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.use('/users', userRoute);

routes.use('/sessions', sessionRouter);

export default routes;
