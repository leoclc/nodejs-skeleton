process.env.NODE_ENV = 'testing';
import { EventRequestDTO } from "@/dtos/event.dto"
import { q } from "./event-queue.service"
import EventService, { BRAND_IDENTIFIER } from "./event.service"

const eventService = new EventService()

describe('Event Service Tests', () => {
  describe('sendEvent', () => {
    it('should enhance event with "brand" before adding to the queue to be processed', async () => {
      const queuePushSpy = jest.spyOn(q, 'push')
      let event: EventRequestDTO = {
        id: "c972fec7-0816-47f5-a684-2f7b74f212a5",
        name: "test event",
        body: "test body",
        timestamp: "1693647588"
      }
      eventService.sendEvent(event)
      expect(queuePushSpy).toHaveBeenCalledWith({brand: BRAND_IDENTIFIER, ...event})
    })
  })
})