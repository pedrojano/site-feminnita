import { Router } from 'express';
import * as ProductController from '../controller/Product.Controller';

export const storeProductRoutes = Router();

storeProductRoutes.get('/', ProductController.list);
storeProductRoutes.get('/:idOrSlug', ProductController.getOne);
