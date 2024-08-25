// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

class PDFParser {
//     async getTextFromPDF(file) {
//         const arrayBuffer = await file.arrayBuffer();
//         const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//         let text = '';
//
//         const numPages = pdf.numPages;
//         for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//             const page = await pdf.getPage(pageNum);
//             const content = await page.getTextContent();
//             text += content.items.map(item => item.str).join(' ') + '\n';
//         }
//
//         return text;
//     }
}

const PDFParserService = new PDFParser();

export default PDFParserService;