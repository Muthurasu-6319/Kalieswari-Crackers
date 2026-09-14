import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync('pdf_text.txt', pdfParser.getRawTextContent());
    console.log('Done');
});

pdfParser.loadPDF("src/assets/kaleswari crackers price lsit 2026.pdf FINAL.pdf");
