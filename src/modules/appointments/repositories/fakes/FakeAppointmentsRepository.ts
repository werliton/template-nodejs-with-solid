/* eslint-disable camelcase */
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '../IAppointmentsRepository';

// Usando o L do SOLID
class FakeAppointmentsRepository implements IAppointmentsRepository {
  findAll(): Promise<Appointment[]> {
    throw new Error('Method not implemented.');
  }

    private appoitments: Appointment[]=[]

    public async create({
      provider_id,
      date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = new Appointment();

      Object.assign(appointment, { id: uuid(), date, provider_id });

      this.appoitments.push(appointment);
      return appointment;
    }

    /**
     * findByDate
date: Date : Appointment | null    */
    public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appoitments
        .find((appointment) => isEqual(appointment.date, date));
      return findAppointment;
    }
}

export default FakeAppointmentsRepository;
