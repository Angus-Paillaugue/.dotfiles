import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/log-in', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
  res.status(200).send('Log-in successful');
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
