import { Router } from 'express';
import { controllerInstance } from '../di/authDI';

const router = Router();


//--------------------------- Authentification routes ---------------------------

router.post('/register', controllerInstance.register.bind(controllerInstance));
router.post('/login', controllerInstance.login.bind(controllerInstance));
router.get('/logout', controllerInstance.logout.bind(controllerInstance));
router.post('/refresh-token', controllerInstance.refreshToken.bind(controllerInstance));


export default router;