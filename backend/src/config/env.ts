import 'dotenv/config';

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
    }
    return value;
}

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3333),
    corsOrigins: process.env.CORS_ORIGINS?.split(',') ?? ['http://localhost:3000'],

    databaseUrl: required('DATABASE_URL'),

    asaas: {
        baseUrl: required('ASAAS_BASE_URL'),
        apiKey: required('ASAAS_API_KEY'),
        webhookToken: required('ASAAS_WEBHOOK_TOKEN'),
    },

    resend: {
        apiKey: required('RESEND_API_KEY'),
        mailFrom: required('MAIL_FROM'),
    },

    melhorEnvio: {
        baseUrl: required('ME_BASE_URL'),
        token: required('ME_TOKEN'),
    },

    store: {
        cep: required('STORE_CEP'),
        name: required('FEMINNITA_NAME'),
        email: required('FEMINNITA_EMAIL'),
        phone: required('FEMINNITA_PHONE'),
        document: required('FEMINNITA_DOCUMENT'),
        address: required('FEMINNITA_ADDRESS'),
        number: required('FEMINNITA_NUMBER'),
        district: required('FEMINNITA_DISTRICT'),
        city: required('FEMINNITA_CITY'),
        state: required('FEMINNITA_STATE'),
    },
};
