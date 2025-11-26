import IAuthRepository from "../IAuthRepository";
import { User, IUser } from "../../models/authSchema";

import { IUserType } from "../../types/authType";

class AuthRepository implements IAuthRepository {

    async findUser(email: string): Promise<IUser | null> {
        const getUser = await User.findOne({ email: email });
        return getUser;
    }

    async registerUser(userData: IUserType): Promise<IUser | null> {
        const user =  User.create(userData);
        return user;
    }

    async getUserById(userId: string): Promise<IUser | null> {
        const user = await User.findOne({ _id: userId });
        return user;
    }
}

export default AuthRepository;