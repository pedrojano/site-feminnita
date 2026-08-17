import { Request, Response } from 'express';
import * as AuthService from '../service/Auth.Service';
import { CUSTOMER_SESSION_COOKIE, SESSION_TTL_MS } from '../config/auth';

const isProduction = process.env.NODE_ENV === 'production';

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const customer = await AuthService.registerCustomer({ name, email, password });
        res.status(201).json({ id: customer.id, name: customer.name, email: customer.email });
    } catch (err) {
        if (err instanceof Error && err.message === 'EMAIL_ALREADY_IN_USE') {
            return res.status(409).json({ error: 'E-mail já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao cadastrar' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const { customer, token } = await AuthService.loginCustomer({ email, password, userAgent: req.headers['user-agent'] });

        res.cookie(CUSTOMER_SESSION_COOKIE, token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: SESSION_TTL_MS,
        });

        res.json({ id: customer.id, name: customer.name, email: customer.email });
    } catch {
        res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }
}

export async function logout(req: Request, res: Response) {
    const token = req.cookies?.[CUSTOMER_SESSION_COOKIE];
    if (token) await AuthService.logoutCustomer(token);
    res.clearCookie(CUSTOMER_SESSION_COOKIE);
    res.status(204).send();
}
