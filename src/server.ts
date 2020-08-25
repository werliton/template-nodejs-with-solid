import express, { json } from 'express';
import routes from './routes';

const app = express();

app.use(json());

app.post('/user', (request, response) => {
  const { name, email } = request.body;

  return response.json({
    name,
    email,
  });
});

app.listen(3333, () => {
  console.log('Server listen in port 3333');
});
