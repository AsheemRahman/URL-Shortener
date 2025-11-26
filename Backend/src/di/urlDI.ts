import IURLController from '../controllers/IURLController';
import URLController from '../controllers/implementation/urlController';
import URLService from '../services/implementation/urlService';
import URLRepository from '../repository/implementation/urlRepository';


const URLRepositoryInstance = new URLRepository();
const URLServiceInstance = new URLService(URLRepositoryInstance);
const urlControllerInstance: IURLController = new URLController(URLServiceInstance);


export { urlControllerInstance };