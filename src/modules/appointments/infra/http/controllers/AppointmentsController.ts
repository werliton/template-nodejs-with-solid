/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
  async create(request:Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.status(201).json(appointment);
  }
}
