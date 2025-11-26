import { IUser } from "../models/authSchema";
import { IUserType } from "../types/authType";


interface IAuthRepository {
    findUser(email: string): Promise<IUser | null>;
    registerUser(userData: IUserType): Promise<IUser | null>;
    getUserById(userId: string): Promise<IUser | null>;
}


export default IAuthRepository;