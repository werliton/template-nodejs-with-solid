/* eslint-disable semi */
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository{
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    /**
     * findByDate
     */
    findByDate(date: Date): Promise<Appointment | undefined> ;

    findAll(): Promise<Appointment[]>
// eslint-disable-next-line @typescript-eslint/no-extra-semi
};
