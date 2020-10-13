import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Route : http://localhost:3333/appointments

appointmentRouter.get('/', (request, response) => {
    return response.json(appointmentsRepository.all());
});

appointmentRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);
        
        const appointment = createAppointment.execute({ provider, date: parsedDate });

        return response.json(appointment);

    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;