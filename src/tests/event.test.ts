process.env.NODE_ENV = 'testing';
import bcrypt from 'bcrypt';
import request from 'supertest';
import App from '@/app';
import EventRoute from '../routes/event.route'
import { q } from '../services/event-queue.service'
import { EventRequestDTO }  from '../dtos/event.dto'

beforeEach(function() {
  
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Event Routes', () => {
  describe('[POST] /event', () => {
    it('should add valid event to queue and respond with 200', async () => {
      const queuePushSpy = jest.spyOn(q, 'push')
      const eventRoute = new EventRoute();
      const app = new App([eventRoute]);
      const payload: EventRequestDTO = {
        id: '1b58e9e8-7f3d-4caa-bb32-e2da18ef42bc',
        name: 'test1name',
        body: 'test1body',
        timestamp: '3243243243324'
      }
      await request(app.getServer()).post(`${eventRoute.path}`).send(payload).expect(200);
      // Event goes to queue
      expect(queuePushSpy).toHaveBeenCalledTimes(1)
    });
    it('should fail with bad request when ID is NOT uuid', async () => {
      const eventRoute = new EventRoute();
      const app = new App([eventRoute]);
      const payload: EventRequestDTO = {
        id: '123',
        name: 'test1name',
        body: 'test1body',
        timestamp: '3243243243324'
      }
      const result = await request(app.getServer()).post(`${eventRoute.path}`).send(payload).expect(400);
      expect(result.body.message).toContain('id must be a UUID')
    });
    it('should fail when name is missing or not a string', async () => {
      const eventRoute = new EventRoute();
      const app = new App([eventRoute]);
      const payload: EventRequestDTO = {
        id: '1b58e9e8-7f3d-4caa-bb32-e2da18ef42bc',
        name: undefined as any,
        body: 'test1body',
        timestamp: '3243243243324'
      }
      const result = await request(app.getServer()).post(`${eventRoute.path}`).send(payload).expect(400);
      expect(result.body.message).toContain('name must be a string')
    });
    it('should fail when body is missing or not a string', async () => {
      const eventRoute = new EventRoute();
      const app = new App([eventRoute]);
      const payload: EventRequestDTO = {
        id: '1b58e9e8-7f3d-4caa-bb32-e2da18ef42bc',
        name: 'test1name',
        body: undefined as any,
        timestamp: '3243243243324'
      }
      const result = await request(app.getServer()).post(`${eventRoute.path}`).send(payload).expect(400);
      expect(result.body.message).toContain('body must be a string')
    });
    it('should fail when timestamp is missing or not a string', async () => {
      const eventRoute = new EventRoute();
      const app = new App([eventRoute]);
      const payload: EventRequestDTO = {
        id: '1b58e9e8-7f3d-4caa-bb32-e2da18ef42bc',
        name: 'test1name',
        body: 'test1body',
        timestamp:undefined as any
      }
      const result = await request(app.getServer()).post(`${eventRoute.path}`).send(payload).expect(400);
      expect(result.body.message).toContain('timestamp must be a string')
    });
  });
});
