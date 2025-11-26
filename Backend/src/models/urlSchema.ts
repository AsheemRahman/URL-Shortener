import { Schema, model, Document, Types } from "mongoose";


export interface IUrl extends Document {
    shortId: string;
    originalUrl: string;
    user: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


const urlSchema = new Schema<IUrl>({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    originalUrl: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });


export const UrlModel = model<IUrl>("Url", urlSchema);