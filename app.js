import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';



dotenv.config(); // loads .env into process.env


const app = express();
app.use(cors()); // Enable CORS for all routes
app.get('/', (req, res) => {
  res.send('Hello, Jenkins + Node.js!');
});

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
