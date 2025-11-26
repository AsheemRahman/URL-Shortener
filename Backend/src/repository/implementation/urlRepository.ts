import { CreateURLDTO } from "../../dto/urlDTO";
import { IUrl, UrlModel } from "../../models/urlSchema";
import IURLRepository from "../IURLRepository";


class URLRepository implements IURLRepository {

    async createURL(urlData: CreateURLDTO): Promise<IUrl | null> {
        const url = await UrlModel.create(urlData);
        return url;
    }

    async getUserUrl(userId: string): Promise<IUrl[] | null> {
        const url = await UrlModel.find({ user: userId }).sort({ createdAt: -1 });
        return url;
    }

    async redirectUrl(shortId: string): Promise<IUrl | null> {
        const url = await UrlModel.findOne({ shortId });
        return url;
    }

    async deleteURL(urlID: string): Promise<IUrl | null> {
        const url = await UrlModel.findByIdAndDelete({ _id: urlID })
        return url;
    }
}

export default URLRepository;