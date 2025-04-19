import express from 'express';
import cors from 'cors';
import routes from './routes';
import 'express-async-errors';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(ErrorHandleMiddleware.handleError);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
