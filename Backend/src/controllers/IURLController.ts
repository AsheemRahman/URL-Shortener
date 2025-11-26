import { Request, Response } from "express";


interface IURLController {
    createURL(req: Request, res: Response): Promise<void>;
    userURL(req: Request, res: Response): Promise<void>;
    redirectURL(req: Request, res: Response): Promise<void>;
    deleteURL(req: Request, res: Response): Promise<void>;
}

export default IURLController;