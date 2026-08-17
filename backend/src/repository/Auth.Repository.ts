import { and, eq, gt } from 'drizzle-orm';
import { db } from '../config/db';
import { customers, customerSessions } from '../db/schema';

export function findCustomerByEmail(email: string) {
    return db.query.customers.findFirst({ where: eq(customers.email, email) });
}

export function findCustomerById(id: string) {
    return db.query.customers.findFirst({
        where: eq(customers.id, id),
        columns: { id: true, name: true, email: true },
    });
}

export async function insertCustomer(values: { name: string; email: string; passwordHash: string }) {
    const [customer] = await db.insert(customers).values(values).returning();
    return customer;
}

export function insertSession(values: { tokenHash: string; customerId: string; userAgent: string; expiresAt: Date }) {
    return db.insert(customerSessions).values(values);
}

export function findActiveSessionByTokenHash(tokenHash: string) {
    return db.query.customerSessions.findFirst({
        where: and(eq(customerSessions.tokenHash, tokenHash), gt(customerSessions.expiresAt, new Date())),
    });
}

export function deleteSessionByTokenHash(tokenHash: string) {
    return db.delete(customerSessions).where(eq(customerSessions.tokenHash, tokenHash));
}
