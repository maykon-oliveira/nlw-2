import Knex from 'knex';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Class } from '../entity/Class';
import { convertHourToMinutes } from '../util';

interface UserClass extends User, Class {}

export class ClassController {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    list = async (req: Request, res: Response) => {        
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search classes',
            });
        }        

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await this.db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return res.json(classes);
    };

    create = async (req: Request, res: Response) => {
        const body: UserClass = req.body;
        const trx = await this.db.transaction();

        try {
            const [user_id] = await trx('users').insert({
                name: body.name,
                avatar: body.avatar,
                whatsapp: body.whatsapp,
                bio: body.bio,
            });

            const [class_id] = await trx('classes').insert({
                subject: body.subject,
                cost: body.cost,
                user_id,
            });

            const schedules = body.schedule.map(({ week_day, from, to }) => ({
                week_day,
                from: convertHourToMinutes(from),
                to: convertHourToMinutes(to),
                class_id,
            }));

            await trx('class_schedule').insert(schedules);

            await trx.commit();
        } catch ({ error }) {
            trx.rollback();
            console.error(error);
            return res.status(500).json({ error });
        }

        return res.status(201).json({});
    };
}
