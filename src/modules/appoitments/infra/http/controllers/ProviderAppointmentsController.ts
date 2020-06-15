import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appoitments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { year, day, month } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      year: Number(year),
      day: Number(day),
      month: Number(month),
    });

    return response.json(classToClass(appointments));
  }
}
