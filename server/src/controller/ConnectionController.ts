import Knex from 'knex';

export class ConnectionController {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }
}
