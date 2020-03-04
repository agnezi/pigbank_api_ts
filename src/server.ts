import cors from 'cors';
import express from 'express';

import { createConnection } from 'typeorm';

import routes from './routes';

class App {
  public express: express.Application

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private async database() {
    await createConnection().then(connection => {
      console.log(`Connected with database`)
    }).catch(error => console.log('Error trying to connect with database', error))
  }

  private routes(): void {
    this.express.use('/api', routes);
  }
}

export default new App().express;