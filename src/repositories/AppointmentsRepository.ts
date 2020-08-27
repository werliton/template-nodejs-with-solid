import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface AppointmentDto{
    provider: string
    date: Date
}
class AppointmentsRepository {
    private appointment: Array<Appointment>

    constructor() {
      this.appointment = [];
    }

    /**
     * create
     */
    public create({ provider, date }: AppointmentDto): Appointment {
      const appointment = new Appointment({ provider, date });

      this.appointment.push(appointment);

      return appointment;
    }

    /**
     * list
 : Array<Appointment>    */
    public all(): Array<Appointment> {
      return this.appointment;
    }

    /**
     * findByDate
date: Date : Appointment | null    */
    public findByDate(date: Date): Appointment | null {
      const appointment = this.appointment.find((item) => isEqual(date, item.date));

      return appointment || null;
    }
}

export default AppointmentsRepository;
