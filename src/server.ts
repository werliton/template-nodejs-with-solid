import express, { json } from 'express';
import routes from './routes';
import 'reflect-metadata';

import './database';

const app = express();

app.use(json());
app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Servidor ouvindo na porta 3333'));
