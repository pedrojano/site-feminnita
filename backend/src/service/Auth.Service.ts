import * as AuthRepository from '../repository/Auth.Repository';
import { hashPassword, verifyPassword } from '../utils/password';
import { generateSessionToken, hashSessionToken } from '../utils/sessionToken';
import { SESSION_TTL_MS } from '../config/auth';

let dummyHashPromise: Promise<string> | null = null;
function getDummyHash() {
    if (!dummyHashPromise) dummyHashPromise = hashPassword('senha-que-nunca-vai-bater');
    return dummyHashPromise;
}

export async function registerCustomer(input: { name: string; email: string; password: string }) {
    const existing = await AuthRepository.findCustomerByEmail(input.email);
    if (existing) throw new Error('EMAIL_ALREADY_IN_USE');

    const passwordHash = await hashPassword(input.password);
    return AuthRepository.insertCustomer({ name: input.name, email: input.email, passwordHash });
}

export async function loginCustomer(input: { email: string; password: string; userAgent?: string }) {
    const customer = await AuthRepository.findCustomerByEmail(input.email);
    const hashToCheck = customer ? customer.passwordHash : await getDummyHash();
    const isValid = await verifyPassword(hashToCheck, input.password);

    if (!customer || !isValid) throw new Error('INVALID_CREDENTIALS');

    const token = generateSessionToken();
    await AuthRepository.insertSession({
        tokenHash: hashSessionToken(token),
        customerId: customer.id,
        userAgent: input.userAgent || 'unknown',
        expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    });

    return { customer, token };
}

export async function logoutCustomer(token: string) {
    await AuthRepository.deleteSessionByTokenHash(hashSessionToken(token));
}
