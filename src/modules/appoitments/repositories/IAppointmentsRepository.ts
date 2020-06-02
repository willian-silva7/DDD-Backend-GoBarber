import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    date: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    date: IFindAllDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
