import { UserResponseDTO } from '../dto/authDTO';
import {  IUserType } from '../types/authType';


interface IAuthService {
    findUser(email: string): Promise<UserResponseDTO | null>;
    validateUserCredentials(email: string, password: string): Promise<UserResponseDTO | null>;
    registerUser(userData: IUserType): Promise<UserResponseDTO | null>;
    getUserById(userId: string): Promise<UserResponseDTO | null>;
}

export default IAuthService;