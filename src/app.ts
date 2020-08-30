import express, { json } from 'express';
import routes from './routes';
import 'reflect-metadata';

import './database';

const app = express();

app.use(routes);

app.use(json());

export default app;
