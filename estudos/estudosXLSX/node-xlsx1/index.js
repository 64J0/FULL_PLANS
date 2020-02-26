//const xlsx = require('node-xlsx').default;
const ExcelJS = require('exceljs');

var fileName = `${__dirname}\\teste.xlsx`;

// Lendo arquivos de uma planilha xlsx
var workBook = new ExcelJS.Workbook();
workBook.xlsx.readFile(fileName)
    .then(function(workBook) {
        workBook.worksheets[0].getCell('D24').value = 'Att. CENTRO NORDESTE';
    })
    .then(() => {
        var numAleatorio = Math.round(Math.random()*10e8);
        console.log(numAleatorio);
        // Salva a planilha com os dados alterados e com o nome aleatório
        workBook.xlsx.writeFile(`teste_${numAleatorio}.xlsx`);
    }) 
    .then(() => {
        // Apaga a planilha dos arquivos do servidor após ter sido feito o download pelo usuário
        // ...
    })
    .then(() => {
        console.log(workBook.worksheets[0].getCell('D24').value);
    })
    .catch(err => console.log(err));

// Escrevendo em uma planlinha xlsx
/*
var workbook = createAndFillWorkbook();
workbook.xlsx.writeFile(filename)
  .then(function() {
    // done
  });
*/