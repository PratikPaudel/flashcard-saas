import { PdfReader } from "pdfreader";
import { Buffer } from 'buffer/';

class PDFParser {
    reader = new PdfReader();

    async getTextFromPDF(file) {
        const arrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);
        let text = '';

        // Create a new promise manually
        await new Promise((resolve, reject) => {
            this.reader.parseBuffer(fileBuffer, (err, item) => {
                if (err) {
                    reject(err); // Reject the promise if there's an error
                } else if (item?.text) {
                    text += item.text; // Accumulate text from the PDF
                } else if (!item) {
                    resolve(); // Resolve the promise when parsing is complete
                }
            });
        });

        return text; // Return the accumulated text
    }
}


const PDFParserService = new PDFParser();

export default PDFParserService;
