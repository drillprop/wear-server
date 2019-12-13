import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  console.log(req);
  res.send('hello worldsssss');
});

app.listen(4000, () => {
  console.log(`server started`);
});
