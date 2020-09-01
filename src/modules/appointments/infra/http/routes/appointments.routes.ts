import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentsRoutes = Router();

const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create,
);
appointmentsRoutes.get('/me', providerAppointmentController.index);

export default appointmentsRoutes;
