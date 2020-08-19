import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRoutes = Router();

const appointmentController = new AppointmentController();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRoutes.post('/', appointmentController.create);

export default appointmentsRoutes;
