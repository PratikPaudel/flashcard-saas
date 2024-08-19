'use client'
import Tesseract from 'tesseract.js';

class ImageParser {
    async getTextFromImage(file) {
        const { data: { text } } = await Tesseract.recognize(
            file,
            'eng',
            {
                logger: info => console.log(info) // Optional: logs progress
            }
        );
        return text;
    }
}

const ImageParserService = new ImageParser();

export default ImageParserService;