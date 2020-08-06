import express from 'express';
import db from '../database/connection';
import knexConfig from '../config/knex.conf';
import { ConnectionController } from './../controller/ConnectionController';

const router = express.Router();
const connection = db(knexConfig['development']);
const connectionController = new ConnectionController(connection);

router.get('/', connectionController.getTotal);
router.post('/', connectionController.incrementConnection);

export default router;
