import { Router } from 'express';
import { urlControllerInstance } from '../di/urlDI';
import authenticationMiddleware from '../middlewares/authentication';

const router = Router();


//--------------------------- url routes ---------------------------

router.post('/', authenticationMiddleware(), urlControllerInstance.createURL.bind(urlControllerInstance));
router.get('/', authenticationMiddleware(), urlControllerInstance.userURL.bind(urlControllerInstance));
router.get('/:shortId', authenticationMiddleware(), urlControllerInstance.redirectURL.bind(urlControllerInstance));
router.delete('/delete/:urlID', authenticationMiddleware(), urlControllerInstance.deleteURL.bind(urlControllerInstance));


export default router;