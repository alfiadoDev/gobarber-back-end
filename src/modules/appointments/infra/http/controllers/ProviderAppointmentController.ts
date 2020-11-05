import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;

    const { id } = request.user;

    const listProviderAppointmentService = container.resolve(
      ListProviderAppointmentService,
    );

    const listProviders = await listProviderAppointmentService.execute({
      provider_id: id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(listProviders);
  }
}
