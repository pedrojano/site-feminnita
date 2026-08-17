import { db } from '../config/db';
import { siteSettings } from '../db/schema';

export function findAll() {
    return db.query.siteSettings.findMany();
}