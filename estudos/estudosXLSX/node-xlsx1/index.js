//const xlsx = require('node-xlsx').default;
const ExcelJS = require('exceljs');

var fileName = `${__dirname}\\teste.xlsx`;

var workBook = new ExcelJS.Workbook();
workBook.xlsx.readFile(fileName)
    .then(function(workBook) {
        var sheet = workBook.worksheets[0].getCell('D9').value;
        console.log(sheet);
    })
    .catch(err => console.log(err));