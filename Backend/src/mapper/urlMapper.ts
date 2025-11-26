import { IUrl } from "../models/urlSchema";

import { CreateURLDTO, URLResponseDTO } from "../dto/urlDTO";

export class UrlMapper {

    static toEntity(dto: CreateURLDTO): IUrl {
        return {
            shortId: dto.shortId,
            originalUrl: dto.originalUrl,
            user: dto.user as any
        } as IUrl;
    }

    static toResponseDTO(url: IUrl): URLResponseDTO {
        return {
            id: url._id.toString(),
            shortId: url.shortId,
            originalUrl: url.originalUrl,
            user: url.user.toString(),
            createdAt: url.createdAt as Date,
            updatedAt: url.updatedAt as Date,
        };
    }
}
