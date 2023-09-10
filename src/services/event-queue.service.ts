import { EVENT_CONCURRENCY_LIMIT, EVENT_RATE_LIMIT_PER_SECOND } from "@/config";
import { EventRequestDTO } from "@/dtos/event.dto";
import { logger } from "@/utils/logger";
const qrate = require('qrate');

export const processEvent = async (data: EventRequestDTO) => {
    logger.info('Processing event with ID: '+data.id);
    return
};
  
export const q = qrate(processEvent, EVENT_CONCURRENCY_LIMIT, EVENT_RATE_LIMIT_PER_SECOND);