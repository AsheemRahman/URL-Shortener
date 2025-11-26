import { CreateURLDTO, URLResponseDTO } from "../dto/urlDTO";


interface IURLService {
    uniqueID(): Promise<string>;
    createURL(urlData: CreateURLDTO): Promise<URLResponseDTO | null>;
    getUserUrl(userId: string): Promise<URLResponseDTO[] | null>;
    redirectUrl(shortId: string): Promise<URLResponseDTO | null>;
    deleteURL(urlID: string): Promise<URLResponseDTO | null>;
}


export default IURLService;