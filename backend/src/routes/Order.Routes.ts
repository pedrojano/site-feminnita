import { Router } from 'express';
import * as OrderController from '../controller/Order.Controller';
import { requireCustomerAuth } from '../middleware/ensureAuthenticated';

export const storeOrderRouter = Router();
storeOrderRouter.use(requireCustomerAuth);

storeOrderRouter.post('/', OrderController.createOrder);
storeOrderRouter.get('/', OrderController.listMine);
storeOrderRouter.get('/:id', OrderController.getMine);