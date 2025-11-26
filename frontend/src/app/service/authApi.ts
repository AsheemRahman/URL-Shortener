import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { toast } from 'react-toastify';

import { AUTH } from "@/utils/constants";
import { IUser, loginType } from "@/types/types";


export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message || "API Error");
    } else {
        console.error("Unexpected Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

const registerPost = async (registerData: IUser) => {
    try {
        const response = await axiosInstance.post(`${AUTH}/register`, registerData);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const LoginPost = async (formData: loginType) => {
    try {
        const response = await axiosInstance.post(`${AUTH}/login`, formData);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const logoutApi = async () => {
    try {
        const response = await axiosInstance.get(`${AUTH}/logout`,)
        return response
    } catch (error: unknown) {
        handleAxiosError(error)
    }
}


const authApi = { registerPost, LoginPost, logoutApi };

export default authApi;