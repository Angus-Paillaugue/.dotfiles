import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;


app.post('/log-in', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
