import { Request, Response } from "express";
import { STATUS_CODES } from "../../constants/statusCode";
import { ERROR_MESSAGES } from "../../constants/errorMessage"

import IURLController from "../IURLController";
import IURLService from "../../services/IURLService";


class URLController implements IURLController {
    private _urlService: IURLService;
    constructor(urlService: IURLService) {
        this._urlService = urlService;
    };

    async createURL(req: Request, res: Response): Promise<void> {
        try {
            const { originalUrl } = req.body;
            const userId = req.userId
            if (!userId) {
                res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: ERROR_MESSAGES.USERID_NOT_FOUND });
                return
            }
            if (!originalUrl) {
                res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: 'Original URL is required' });
                return
            }
            const shortId = await this._urlService.uniqueID();
            if (!shortId) {
                res.status(STATUS_CODES.CONFLICT).json({ status: false, message: "Create Unique ID failed" })
            }
            const url = await this._urlService.createURL({ shortId, originalUrl, user: userId });
            res.status(STATUS_CODES.OK).json({ status: true, message: "URL created successfully", url });
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Create URL failed" });
        };
    };

    async userURL(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId
            if (!userId) {
                res.status(STATUS_CODES.NOT_FOUND).json({ status: false, message: ERROR_MESSAGES.USERID_NOT_FOUND });
                return
            }
            const urls = await this._urlService.getUserUrl(userId);
            res.status(STATUS_CODES.OK).json({ status: true, message: "Fetch all user urls", urls });
            return
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to get all url" });
        };
    };

    async redirectURL(req: Request, res: Response): Promise<void> {
        try {
            const { shortId } = req.params;
            const url = await this._urlService.redirectUrl(shortId);
            if (!url) {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: 'URL not found' });
                return;
            }
            return res.redirect(url.originalUrl);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Redirect failed" });
        };
    };

    async deleteURL(req: Request, res: Response): Promise<void> {
        try {
            const { urlID } = req.params;
            if (!urlID) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ status: false, message: ERROR_MESSAGES.NOT_FOUND })
                return;
            }
            const url = await this._urlService.deleteURL(urlID);
            res.status(STATUS_CODES.OK).json({ status: true, message: "URL Deleted Successfully", url })
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Deleted url failed" });
        };
    };
}

export default URLController;