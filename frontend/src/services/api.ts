import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface CheckResponse {
    label: string;
    confidence: number;
    explanation_summary: string;
    word_importances: [string, number][];
    metadata?: any;
}

export const checkArticle = async (text?: string, url?: string): Promise<CheckResponse> => {
    const payload = url ? { url } : { text };
    const response = await apiClient.post<CheckResponse>('/check', payload);
    return response.data;
};
