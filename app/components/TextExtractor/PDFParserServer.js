import { PdfReader } from "pdfreader";
import { Buffer } from 'buffer/';

class PDFParser {
    reader = new PdfReader();

    async getTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        let text = '';
        await new Promise((resolve, reject) => {
            this.reader.parseBuffer(fileBuffer, (err, item) => {
                if (err) {
                    reject(err);
                } else if (item?.text) {
                    text += item.text;
                } else if (!item) {
                    resolve();
                }
            });
        });
        return text;
    }
}

const PDFParserService = new PDFParser();

export default PDFParserService;
