const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('../src/assets/kaleswari crackers price lsit 2026.pdf FINAL.pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('../pdf_text.txt', data.text);
    console.log('Done');
});
