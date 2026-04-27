
import { db } from "./db";

export interface CSRCopyData {
    foodName: string;
    donorName: string;
    impactPoints?: number;
    co2Saved?: number;
    tone?: string;
    platform?: string;
    language?: string;
    portions?: number;
    wasteWeight?: number;
    pov?: string;
}

export interface CSRResult {
    mainCopy?: string;
    mainCopyDonor?: string;
    mainCopyReceiver?: string;
    hooks: string[];
    hashtags: string[];
    variations: { type: string; content: string }[];
}

export const contentWriter = {
    writeCSR: async (data: CSRCopyData, role: string): Promise<CSRResult> => {
        const result = await db.callCorporateAI('WRITE_CSR_COPY', role, data);
        
        // Handle new structured format from backend
        return {
            mainCopy: result.mainCopy,
            mainCopyDonor: result.mainCopyDonor,
            mainCopyReceiver: result.mainCopyReceiver,
            hooks: result.hooks || [],
            hashtags: result.hashtags || [],
            variations: result.variations || []
        };
    }
};
