import Knex from 'knex';
import { Request, Response } from 'express';

export class ConnectionController {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    getTotal = async (req: Request, res: Response) => {
        const count = await this.db('connections').count({ total: ['id'] });
        res.json(count[0]);
    };

    incrementConnection = (req: Request, res: Response) => {
        const { user_id } = req.body;

        this.db('connections')
            .insert({
                user_id,
            })
            .then();

        res.send();
    };
}
