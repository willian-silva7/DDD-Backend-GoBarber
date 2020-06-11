import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appoitments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { year, day, month } = request.body;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year,
      day,
      month,
    });

    return response.json(appointments);
  }
}
