export interface AuthDTO {
    name: string;
    email: string;
    password?: string;
    phoneNumber?: string;
}

export interface UserResponseDTO {
    userId: string;
    name: string;
    email: string;
    phoneNumber?: string;
    createdAt: Date;
}