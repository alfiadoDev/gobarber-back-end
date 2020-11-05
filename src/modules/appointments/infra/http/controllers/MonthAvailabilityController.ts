import { Request, Response } from 'express';
import { container } from 'tsyringe';

import LisProvidertMonthAvailabilityService from '@modules/appointments/services/LisProvidertMonthAvailabilityService';

export default class MonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const lisProvidertMonthAvailabilityService = container.resolve(
      LisProvidertMonthAvailabilityService,
    );

    const availability = await lisProvidertMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
