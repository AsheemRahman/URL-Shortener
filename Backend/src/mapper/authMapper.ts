import { UserResponseDTO, AuthDTO } from "../dto/authDTO";
import { IUserType } from "../types/authType";

export class UserMapper {
    static toResponseDTO(user: any): UserResponseDTO {
        return {
            userId: user._id.toString(),
            name: user.fullName,
            email: user.email!,
            phoneNumber: user.phoneNumber?.toString(),
            createdAt: user.createdAt!,
        };
    }

    static toEntity(createDto: AuthDTO): IUserType {
        return {
            name: createDto.name,
            email: createDto.email,
            password: createDto.password,
            phoneNumber: createDto.phoneNumber,
        };
    }
}