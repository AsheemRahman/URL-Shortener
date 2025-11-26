import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { toast } from 'react-toastify';

import { URL } from "@/utils/constants";


export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message || "API Error");
    } else {
        console.error("Unexpected Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

const createURL = async (originalUrl: string) => {
    try {
        const response = await axiosInstance.post(`${URL}`, { originalUrl });
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const getUrls = async () => {
    try {
        const response = await axiosInstance.get(`${URL}`);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const redirectURL = async (shortId: string) => {
    try {
        const response = await axiosInstance.get(`${URL}/${shortId}`,)
        return response
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const deleteURL = async (shortId: string) => {
    try {
        const response = await axiosInstance.delete(`${URL}/delete/${shortId}`,)
        return response
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};


const urlApi = { createURL, getUrls, redirectURL, deleteURL };

export default urlApi;