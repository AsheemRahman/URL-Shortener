import { CreateURLDTO } from "../dto/urlDTO";
import { IUrl } from "../models/urlSchema";


interface IURLRepository {
    createURL(urlData: CreateURLDTO): Promise<IUrl | null>;
    getUserUrl(userId: string): Promise<IUrl[] | null>;
    redirectUrl(shortId: string): Promise<IUrl | null>;
    deleteURL(urlID: string): Promise<IUrl | null>;
}


export default IURLRepository;