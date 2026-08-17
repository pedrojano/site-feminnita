import { Request, Response } from 'express';
import * as OrderService from '../service/Order.Service';

export async function createOrder(req: Request, res: Response) {

    try {
        const order = await OrderService.createOrder({
            customerId: req.customer!.id,
            items: req.body.items,
            paymentMethod: req.body.paymentMethod,
            installments: req.body.installments,
            creditCard: req.body.creditCard,
            couponCode: req.body.couponCode,
            shippingServiceId: Number(req.body.shippingServiceId),
            shippingAddress: req.body.shippingAddress,
            remoteIp: req.ip,
        });
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error instanceof Error ? error.message : 'Erro ao criar pedido' });
    }
}

export async function listMine(req: Request, res: Response) {
    res.json(await OrderService.listMyOrders(req.customer!.id));
}

export async function getMine(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
        res.json(await OrderService.getMyOrder(id, req.customer!.id));
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Pedido não encontrado' })
    }
}
