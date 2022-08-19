export interface FormInputsType {
    email: string;
    password: string;
    password_repeat: string;
    name: string;
    surname: string;
    phone: number;
}

export interface IUser {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: number;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface TokenInfo {
    userId: string
    email?: string;
}