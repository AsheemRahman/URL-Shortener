import AuthController from '../controllers/implementation/authController';
import IAuthController from '../controllers/IAuthController';
import AuthService from '../services/implementation/authService';
import AuthRepository from '../repository/implementation/authRepository';


const userRepositoryInstance = new AuthRepository();
const userServiceInstance = new AuthService(userRepositoryInstance);
const controllerInstance: IAuthController = new AuthController(userServiceInstance);


export { controllerInstance };