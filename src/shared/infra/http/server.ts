import express, {
  json, Request, Response, NextFunction,
} from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import routes from './routes';
import 'reflect-metadata';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err:Error, request: Request, response: Response, _:NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Servidor ouvindo na porta 3333'));
