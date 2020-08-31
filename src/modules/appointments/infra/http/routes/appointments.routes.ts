import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProviderAppointmentController from '../controllers/ProviderAppointmentController';

const appointmentsRoutes = Router();

const appointmentController = new AppointmentController();
const providerAppointmentController = new ProviderAppointmentController();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRoutes.post('/', appointmentController.create);
appointmentsRoutes.get('/me', providerAppointmentController.index);

export default appointmentsRoutes;
