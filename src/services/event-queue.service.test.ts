process.env.NODE_ENV = 'testing';
import { EventRequestDTO } from "@/dtos/event.dto"
import { q } from "./event-queue.service"
import EventService, { BRAND_IDENTIFIER } from "./event.service"
import { logger } from "@/utils/logger";

describe('Event Queue Service Tests', () => {
  describe('processEvent', () => {
    it('should process all events pushed to the queue', async () => {
      const queuePushSpy = jest.spyOn(q, 'push')
      let event1: EventRequestDTO = {
        id: "c972fec7-0816-47f5-a684-2f7b74f212a5",
        name: "test event",
        body: "test body",
        timestamp: "1693647588"
      }
      let event2: EventRequestDTO = {id: 'd972fec7-0816-47f5-a684-2f7b74f212a5', ...event1}
      const loggerSpy = jest.spyOn(logger, 'info')
      q.push(event1)
      q.push(event2)
      await new Promise((r) => setTimeout(r, 1000));
      expect(loggerSpy).toHaveBeenCalledTimes(2)
      expect(loggerSpy).toHaveBeenCalledWith('Processing event with ID: '+event1.id)
      expect(loggerSpy).toHaveBeenCalledWith('Processing event with ID: '+event2.id)
    })
  })
})