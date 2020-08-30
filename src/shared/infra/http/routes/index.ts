import { Router } from 'express';

import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoute from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRoute from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRoutes);

routes.use('/users', userRoute);

routes.use('/sessions', sessionRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/providers', providersRoute);

export default routes;
