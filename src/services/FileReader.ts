import * as fs from 'fs';

export class FileReader {
    async readFromPathOrUrl(pathOrUrl: string): Promise<string> {
        if (/^https?:\/\//i.test(pathOrUrl)) {
            // URL
            try {
                const response = await fetch(pathOrUrl);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return await response.text();
            } catch (error) {
                console.error('Error reading from URL:', error);
                throw error;
            }
        } else {
            // Local path
            try {
                return fs.readFileSync(pathOrUrl, 'utf-8');
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }
    }
}