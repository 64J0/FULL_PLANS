const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos');

var fileName = path.resolve(__dirname, '../assets/teste.xlsx');

exports.genExcelFile = async (id) => {
    // Recupera os dados do projeto com o id informado no banco de dados
    const res = await Projetos.findById(id);

    // Inicia o processo de atualização nos dados da planilha com o módulo ExcelJS
    var workBook = new ExcelJS.Workbook();
    workBook.xlsx.readFile(fileName)
        .then(function(workBook) {
            // Célula de cliente
            workBook.worksheets[0].getCell('D5').value = res.cliente;

            // Célula do responsável
            workBook.worksheets[0].getCell('D11').value = res.responsavel;

            // Célula de quantidade de desenhos
            workBook.worksheets[0].getCell('D20').value = parseInt(res.infoProjetos.length);

            // Célula com o número do pedido e o nome do Projeto
            workBook.worksheets[0].getCell('D24').value = res.numPedido + ' - ' + res.nomeProjeto;

            for(var aux = 0; aux < res.infoProjetos.length; aux++) {

                workBook.worksheets[0].getCell(`B${aux + 34}`).value = 
                    parseInt(`${aux + 1}`);

                // Célula com o valor do número do fornecedor
                workBook.worksheets[0].getCell(`C${aux + 34}`).value = 
                    res.infoProjetos[aux].numFull;

                // Célula com o valor do número do cliente
                workBook.worksheets[0].getCell(`D${aux + 34}`).value = 
                    res.infoProjetos[aux].numCliente;

                // Célula com o valor da revisão
                workBook.worksheets[0].getCell(`E${aux + 34}`).value = 
                    res.infoProjetos[aux].revisao;

                // Célula com o valor do formato
                workBook.worksheets[0].getCell(`F${aux + 34}`).value = 
                    res.infoProjetos[aux].formato;
            }
        })
        .then(() => {
            var numAleatorio = Math.round(Math.random()*10e8);
            console.log(numAleatorio);
            // Salva a planilha com os dados alterados e com o nome aleatório
            workBook.xlsx.writeFile(`planilha_${numAleatorio}.xlsx`);
            const file = fs.readFileSync(path.resolve(__dirname, '..', '..', `planilha_${numAleatorio}.xlsx`));
            return(file);
        }) 
        .then((file) => {
            // Apaga a planilha dos arquivos do servidor após ter sido feito o download pelo usuário
            // ...
            return(file);
        })
        .catch(err => console.log(err));
    
}