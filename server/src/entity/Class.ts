import { Schedule } from './Schedule';

export interface Class {
    subject: string;
    cost: number;
    schedule: Schedule[];
}
