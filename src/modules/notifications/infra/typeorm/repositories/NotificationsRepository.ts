import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '../schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationsRepository implements INotificationsRepository {
    private mongoRepository: MongoRepository<Notification>;

    constructor() {
        this.mongoRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.mongoRepository.create({ content, recipient_id });
        await this.mongoRepository.save(notification);
        return notification;
    }
}

export default NotificationsRepository;