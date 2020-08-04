import express from 'express';
import db from '../database/connection';
import knexConfig from '../config/knex.conf';
import { ClassController } from './../controller/ClassController';

const router = express.Router();
const connection = db(knexConfig['development']);
const classController = new ClassController(connection);

router.get('/', classController.list);
router.post('/', classController.create);

export default router;
