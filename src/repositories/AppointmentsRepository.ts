import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
    private appointment: Array<Appointment>

    constructor() {
      this.appointment = [];
    }

    /**
     * create
     */
    public create(provider: string, date: Date): Appointment {
      const appointment = new Appointment(provider, date);

      this.appointment.push(appointment);

      return appointment;
    }

    /**
     * list
 : Array<Appointment>    */
    public list(): Array<Appointment> {
      return this.appointment;
    }

    /**
     * findByDate
date: Date : Appointment | null    */
    public findByDate(date: Date): Appointment | null {
      const appointment = this.appointment.find((item) => isEqual(date, item.data));

      return appointment || null;
    }
}

export default AppointmentsRepository;
