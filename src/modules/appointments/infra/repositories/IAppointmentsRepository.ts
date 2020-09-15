/* eslint-disable semi */
import Appointment from '../typeorm/entities/Appointment';

export default interface IAppointmentsRepository{
    /**
     * findByDate
     */
    findByDate(date: Date): Promise<Appointment | undefined> ;
// eslint-disable-next-line @typescript-eslint/no-extra-semi
};
