import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LisProvidertMonthAvailabilityService from '@modules/appointments/services/LisProvidertMonthAvailabilityService';

export default class MonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const lisProvidertMonthAvailabilityService = container.resolve(
      LisProvidertMonthAvailabilityService,
    );

    const availability = await lisProvidertMonthAvailabilityService.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
