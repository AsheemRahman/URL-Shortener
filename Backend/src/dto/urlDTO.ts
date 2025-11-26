export interface CreateURLDTO {
    originalUrl: string;
    shortId: string;
    user: string;
}

export interface URLResponseDTO {
    id: string;
    shortId: string;
    originalUrl: string;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}
