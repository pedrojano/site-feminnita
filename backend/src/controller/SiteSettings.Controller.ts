import { Request, Response } from 'express';
import * as SiteSettingsRepository from '../repository/SiteSettings.Repository';

export async function list(req: Request, res: Response) {
    const settings = await SiteSettingsRepository.findAll();

    const byKey = Object.fromEntries(settings.map((s: any) => [s.key, s.value]));

    res.json(byKey);
}