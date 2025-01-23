import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import logIn from './routes/log-in';
import authenticate from './routes/authenticate';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.post('/log-in', logIn);
router.post('/auth', authenticate);
router.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/', router);

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
