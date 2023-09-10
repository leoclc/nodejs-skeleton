import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import EventController from '@/controllers/event.controller';
import { checkJwtMiddleware } from '@/utils/auth';
import validationMiddleware from '@/middlewares/validation.middleware';
import { EventRequestDTO } from '@/dtos/event.dto';
const { requiredScopes } = require('express-oauth2-bearer');

class EventRoute implements Routes {
  public path = '/event';
  public router = Router();
  public eventController = new EventController();
  public middlewares = [];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    let env = process.env["NODE_ENV"];
    if(env !== 'testing') {
      this.middlewares.push(checkJwtMiddleware, requiredScopes('write:event'))
    }
    this.middlewares.push(validationMiddleware(EventRequestDTO, 'body'),  this.eventController.mockedApiCall)
    this.router.post(`${this.path}`, ...this.middlewares);
  }
}

export default EventRoute;
