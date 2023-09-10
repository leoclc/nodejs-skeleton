import { EVENT_CONCURRENCY_LIMIT, EVENT_RATE_LIMIT_PER_SECOND } from '@/config';
import { EventRequestDTO } from '@/dtos/event.dto';
import { logger } from '@/utils/logger';
import { q } from './event-queue.service';

export const BRAND_IDENTIFIER = 'testBrand'

class EventService {

  public sendEvent(eventData: EventRequestDTO): Promise<void> {
    const targetEvent = {brand: BRAND_IDENTIFIER, ... eventData}
    logger.info('Adding event to the queue to be sent to target GraphQL API: '+JSON.stringify(targetEvent))
    q.push(targetEvent)
    return Promise.resolve()
  }
}

export default EventService;
