import express from 'express';
import cors from 'cors';

import ConnectionRouter from './routes/connections';
import ClassRouter from './routes/classes';

const App = express();

App.use(cors());
App.use(express.json());

App.use('/connections', ConnectionRouter);
App.use('/classes', ClassRouter);

export default App;
