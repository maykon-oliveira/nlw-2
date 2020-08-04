import express from 'express';

import ConnectionRouter from './routes/connections';
import ClassRouter from './routes/classes';

const App = express();

App.use(express.json())

App.use('/connections', ConnectionRouter);
App.use('/classes', ClassRouter);

export default App;
