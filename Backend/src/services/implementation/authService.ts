
import IAuthService from "../IAuthService";
import IAuthRepository from "../../repository/IAuthRepository";

import PasswordUtils from "../../utils/passwordUtils";

import {  IUserType } from '../../types/authType'
import { UserMapper } from "../../mapper/authMapper";
import { UserResponseDTO } from "../../dto/authDTO";


class AuthService implements IAuthService {
    private _authRepository: IAuthRepository;
    constructor(authRepository: IAuthRepository) {
        this._authRepository = authRepository;
    };

    async findUser(email: string): Promise<UserResponseDTO | null> {
        const user = await this._authRepository.findUser(email);
        return user ? UserMapper.toResponseDTO(user) : null;
    };

    async validateUserCredentials(email: string, password: string): Promise<UserResponseDTO | null> {
        const user = await this._authRepository.findUser(email);
        if (!user || !user.password) return null;
        const isPasswordValid = await PasswordUtils.comparePassword(password, user.password);
        if (!isPasswordValid) return null;
        return user ? UserMapper.toResponseDTO(user) : null;
    };

    async registerUser(userData: IUserType): Promise<UserResponseDTO | null> {
        const userEntity = UserMapper.toEntity(userData);
        if (userEntity.password) {
            userEntity.password = await PasswordUtils.passwordHash(userEntity.password);
        }
        const newUser = await this._authRepository.registerUser(userEntity);
        return newUser ? UserMapper.toResponseDTO(newUser) : null;
    };

    async getUserById(userId: string): Promise<UserResponseDTO | null> {
        const user = await this._authRepository.getUserById(userId);
        return user ? UserMapper.toResponseDTO(user) : null;
    };
}


export default AuthService;