import { Request, Response } from 'express';
import * as OrdeRepository from '../repository/Order.Repository';
import * as MelhorEnvio from '../integrations/melhorEnvio/Service';

export async function quote(req: Request, res: Response) {

    try {
        const { cep, items } = req.body as { cep?: string; items?: { productId: string; quantity: number }[] };

        if (!cep || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                error: 'Informe cep e items'
            });
        }

        const products = await OrdeRepository.findProductsByIds(items.map((i) => i.productId));

        const productById = new Map(products.map((p) => [p.id, p]));

        const quotable = items.map((item) => {
            const product = productById.get(item.productId);

            if (!product) throw new Error(`Product_NOT_FOUND: ${item.productId}`);

            return {
                weightKg: product.weightKg,
                pkgHeightCm: product.pkgHeightCm,
                pkgWidthCm: product.pkgWidthCm,
                pkgLengthCm: product.pkgLengthCm,
                quantity: item.quantity,

            };
        });
        res.json(await MelhorEnvio.quoteShipping(cep, quotable));
    } catch (error) {
        console.error('Erro na cotação de frete: ', error);
        res.status(500).json({ error: 'Não foi possível cotar o frete agora' });
    }
}