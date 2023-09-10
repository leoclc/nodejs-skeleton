import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@/services/event.service';
import { logger } from '@/utils/logger';
import { EventRequestDTO } from '@/dtos/event.dto';
import { REQUEST_ID_HEADER_NAME } from '@/app';
import EventService from '@/services/event.service';

class EventController {

    public eventService = new EventService();

    public mockedApiCall = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const eventData = req.body as EventRequestDTO
            logger.info(`Received event with ID: ${eventData.id}`)
            this.eventService.sendEvent(eventData)
            res.send().status(200)
        } catch (error) {
          next(error);
        }
      };

}

export default EventController;
