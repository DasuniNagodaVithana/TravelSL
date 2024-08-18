import express, { Request, Response } from 'express';
import cors from 'cors';
import UserModel from './mongo'; // Import the updated model

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('GET request to the homepage');
});

app.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      res.json('exist');
    } else {
      res.json('notexist');
    }
  } catch (e) {
    console.error(e);
    res.json('fail');
  }
});

app.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = {
    email,
    password,
  };

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      res.json('exist');
    } else {
      res.json('notexist');
      await UserModel.create(data);
    }
  } catch (e) {
    console.error(e);
    res.json('fail');
  }
});

app.listen(8000, () => {
  console.log('Server running on port 3000');
});
