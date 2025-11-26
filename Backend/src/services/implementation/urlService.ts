import IURLService from "../IURLService";
import IURLRepository from "../../repository/IURLRepository";

import { nanoid } from "nanoid";

import { CreateURLDTO, URLResponseDTO } from "../../dto/urlDTO";
import { UrlMapper } from "../../mapper/urlMapper";


class URLService implements IURLService {
    private _urlRepository: IURLRepository;
    constructor(urlRepository: IURLRepository) {
        this._urlRepository = urlRepository;
    };

    async uniqueID(): Promise<string> {
        return nanoid(8);
    };

    async createURL(urlData: CreateURLDTO): Promise<URLResponseDTO | null> {
        // const entity = UrlMapper.toEntity(urlData);
        const created = await this._urlRepository.createURL(urlData);
        return created ? UrlMapper.toResponseDTO(created) : null;
    }

    async getUserUrl(userId: string): Promise<URLResponseDTO[] | null> {
        const url = await this._urlRepository.getUserUrl(userId);
        if (!url) return null;
        return url.map(UrlMapper.toResponseDTO);
    };

    async redirectUrl(shortId: string): Promise<URLResponseDTO | null> {
        const url = await this._urlRepository.redirectUrl(shortId);
        return url ? UrlMapper.toResponseDTO(url) : null;
    };

    async deleteURL(urlID: string): Promise<URLResponseDTO | null> {
        const url = await this._urlRepository.deleteURL(urlID);
        return url ? UrlMapper.toResponseDTO(url) : null;
    };
}


export default URLService;