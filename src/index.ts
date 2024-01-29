import { db } from 'db';
import { tasks } from 'db/schema';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import { zodMiddleware } from 'middleware/zod.middleware.ts';
import router from 'router';
import cors from 'cors';

const PORT = 5000;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(zodMiddleware);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
