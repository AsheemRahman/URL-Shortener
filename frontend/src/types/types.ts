export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phoneNumber?: string;
    createdAt?: Date;
}

export interface Url {
    id: string;
    shortId: string;
    originalUrl: string;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    user?: IUser;
    message?: string;
}

export interface loginType {
    email: string;
    password: string;
}