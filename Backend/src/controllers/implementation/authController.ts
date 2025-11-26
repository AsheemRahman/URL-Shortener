import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCode";
import { ERROR_MESSAGES } from "../../constants/errorMessage"
import { SUCCESS_MESSAGES } from "../../constants/successMessage"

import IAuthController from "../IAuthController";
import IAuthService from "../../services/IAuthService";

import JwtUtility, { TokenPayload } from "../../utils/JwtUtility";
import { JwtPayload } from "jsonwebtoken";


class AuthController implements IAuthController {
    private _authService: IAuthService;
    constructor(authService: IAuthService) {
        this._authService = authService;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, phoneNumber, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT });
                return;
            }
            // Check if email already exists
            const isEmailUsed = await this._authService.findUser(email);
            if (isEmailUsed) {
                res.status(STATUS_CODES.CONFLICT).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_EXIST });
                return;
            }
            await this._authService.registerUser({ name, phoneNumber, email, password });
            res.status(STATUS_CODES.OK).json({ status: true, message: "User create successfully", });
        } catch (error) {
            console.log("Error while register new user", error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ status: false, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ status: false, message: ERROR_MESSAGES.INVALID_INPUT });
                return;
            }
            const currentUser = await this._authService.validateUserCredentials(email, password);
            if (!currentUser) {
                res.status(STATUS_CODES.FORBIDDEN).json({ status: false, message: "Invalid email or password" });
                return;
            }
            const payload = { userId: (currentUser.userId as string).toString(), email: currentUser.email };
            const accessToken = JwtUtility.generateAccessToken(payload);
            const refreshToken = JwtUtility.generateRefreshToken(payload);
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("accessToken", accessToken, { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE || "1440000") });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: parseInt(process.env.REFRESH_TOKEN_MAX_AGE || "86400000") });
            res.status(STATUS_CODES.OK).json({ status: true, message: SUCCESS_MESSAGES.LOGIN, user: currentUser, token: accessToken });
        } catch (error) {
            console.log("Error while login", error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ status: false, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    };

    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies['refreshToken'];
            if (!refreshToken) {
                res.status(STATUS_CODES.FORBIDDEN).json({ status: false, message: ERROR_MESSAGES.REFRESH_TOKEN_MISSING });
                return;
            }
            // Verify the refresh token using JwtUtility
            let decoded: string | JwtPayload;
            try {
                decoded = JwtUtility.verifyToken(refreshToken, true);
            } catch (err) {
                res.status(STATUS_CODES.FORBIDDEN).json({ status: false, message: ERROR_MESSAGES.REFRESH_TOKEN_MISSING });
                return
            }
            const { userId, email } = decoded as TokenPayload;
            if (!userId) {
                res.status(STATUS_CODES.UNAUTHORIZED).json({ status: false, message: ERROR_MESSAGES.INVALID_REFRESH_TOKEN });
                return
            }
            const isProduction = process.env.NODE_ENV === "production";
            const newAccessToken = JwtUtility.generateAccessToken({ userId, email });
            res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE || "1440000") });
            res.status(STATUS_CODES.OK).json({ status: true, accessToken: newAccessToken, message: "Access token refreshed successfully" });
        } catch (error) {
            console.log("Error while refresh token", error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ status: false, message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        }
    };

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const isProduction = process.env.NODE_ENV === "production";
            res.clearCookie("accessToken", { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", });
            res.clearCookie("refreshToken", { httpOnly: true, secure: isProduction, sameSite: isProduction ? "none" : "lax", });
            res.status(STATUS_CODES.OK).json({ status: true, message: "Logged out successfully" });
            return
        } catch (error: any) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Logout failed", error: error.message });
        }
    };
}

export default AuthController;