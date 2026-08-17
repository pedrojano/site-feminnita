import { Router } from 'express';
import * as AuthController from '../controller/Auth.Controller';

export const storeAuthRoutes = Router();

storeAuthRoutes.post('/register', AuthController.register);
storeAuthRoutes.post('/login', AuthController.login);
storeAuthRoutes.post('/logout', AuthController.logout);
