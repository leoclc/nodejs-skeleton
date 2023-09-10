import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, API_IDENTIFIER } from '@config';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import Context from './middlewares/context.middleware';
import { logger, stream } from '@utils/logger';
import {v4 as uuidv4} from 'uuid';
export const REQUEST_ID_HEADER_NAME = 'X-Request-Id';


class App {
  
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.app.use(Context.setup)
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initialize404Handler();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use((req, res, next) => {
      if(!req.headers[REQUEST_ID_HEADER_NAME]) {
        const id = uuidv4();
        req.headers[REQUEST_ID_HEADER_NAME] = id;
      }
      
      res.append('X-Request-Id', req[REQUEST_ID_HEADER_NAME]);
      return next();
    })
    morgan.token('id', (req) => {
      return req.headers[REQUEST_ID_HEADER_NAME] as string;
    })
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    //this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'PSec Engineering NodeJS Skeleton Service',
          version: '1.0.0',
          description: '',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initialize404Handler() {
    this.app.use((req, res) => {
      res.status(404).send()
    })
  }
}

export default App;
