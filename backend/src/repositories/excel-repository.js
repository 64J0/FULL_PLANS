const path = require('path');
const ExcelJS = require('exceljs');
const mongoose = require('mongoose');
const Projetos = mongoose.model('Projetos');

var filePath = path.resolve(__dirname, '../assets/teste.xlsx');

exports.genExcelFile = async (id) => {
    // Recupera os dados do projeto com o id informado no banco de dados
    const res = await Projetos.findById(id);

    // Inicia o processo de atualização nos dados da planilha com o módulo ExcelJS
    var workBook = new ExcelJS.Workbook();
    workBook.lastModifiedBy = 'ADM Full Engenharia';
    workBook.modified = new Date();

    var saida = await workBook.xlsx.readFile(filePath)
    .then(function(workBook) {
        // Título da GRD
        workBook.worksheets[0].getCell('C3').alignment = { vertical: 'middle', horizontal: 'center' };

        // Célula de cliente
        workBook.worksheets[0].getCell('D5').value = res.cliente;
        workBook.worksheets[0].getCell('D5').alignment = { vertical: 'middle', horizontal: 'left' };

        // Célula do responsável
        workBook.worksheets[0].getCell('C11').value = 'Responsável pelo Projeto:';
        workBook.worksheets[0].getCell('C11').alignment = { vertical: 'middle', horizontal: 'right' };
        workBook.worksheets[0].getCell('D11').value = res.responsavel;

        // Célula de quantidade de desenhos
        workBook.worksheets[0].getCell('D20').value = parseInt(res.infoProjetos.length);

        // Célula com o número do pedido e o nome do Projeto
        workBook.worksheets[0].getCell('D24').value = res.numPedido + ' - ' + res.nomeProjeto;

        /*
            Esta parte do código salva os valores encontrados na parte inferior da planilha para serem reutilizados posteriormente
        */
        let C41 = workBook.worksheets[0].getCell('C41').value;
        workBook.worksheets[0].getCell('C41').value = '';
        let D41 = workBook.worksheets[0].getCell('D41').value;
        workBook.worksheets[0].getCell('D41').value = '';
        let E41 = workBook.worksheets[0].getCell('E41').value;
        workBook.worksheets[0].getCell('E41').value = '';
        let F41 = workBook.worksheets[0].getCell('F41').value;
        workBook.worksheets[0].getCell('F41').value = '';
        let H41 = workBook.worksheets[0].getCell('H41').value;
        workBook.worksheets[0].getCell('H41').value = '';
        let C44 = workBook.worksheets[0].getCell('C44').value;
        workBook.worksheets[0].getCell('C44').value = '';
        let D44 = workBook.worksheets[0].getCell('D44').value;
        workBook.worksheets[0].getCell('D44').value = '';
        let E44 = workBook.worksheets[0].getCell('E44').value;
        workBook.worksheets[0].getCell('E44').value = '';
        let C46 = workBook.worksheets[0].getCell('C46').value;
        workBook.worksheets[0].getCell('C46').value = '';

        var varAscii = 'B'.charCodeAt(0), // Retorna o código ASCII desse caractere
            limiteAux2 = 'L'.charCodeAt(0) - varAscii,
            varColNum = undefined,
            varColStr = undefined,
            str = undefined,
            soma = undefined;

        // Preenche os dados de cada desenho do projeto
        for(var aux = 0; aux < res.infoProjetos.length; aux++) {

            console.log(res.infoProjetos.length);

            // Estilização da planilha
            for(var aux2 = 0; aux2 <= limiteAux2; aux2++) {
                varColNum = varAscii + aux2;
                varColStr = String.fromCharCode(varColNum);
                soma = aux + 34;
                str = String(varColStr + soma);

                // Deixa em negrito os textos
                workBook.worksheets[0].getCell(`${str}`).font = {
                    bold: true
                };
                // Coloca as bordas
                workBook.worksheets[0].getCell(`${str}`).border = {
                    top: { style: 'thin', color: { argb: 'FF000000' } },
                    left: { style: 'thin', color: { argb: 'FF000000' } },
                    bottom: { style: 'thin', color: { argb: 'FF000000' } },
                    right: { style: 'thin', color: { argb: 'FF000000' } }
                };

                if ((aux2 <= 4) || (aux2 >= 8)) {
                    workBook.worksheets[0].getCell(`${str}`).alignment = { vertical: 'middle', horizontal: 'center' }
                }

                console.log('str', str);
            }

            // índice mostrado na lateral para indicar quantos desenhos tem no projeto
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

        /*
            Adiciona novamente o final da planilha
        */
        const salto = (res.infoProjetos.length + 34 + 2);
        workBook.worksheets[0].getCell(`C${salto}`).value = C41;
        workBook.worksheets[0].getCell(`D${salto}`).value = D41;
        workBook.worksheets[0].getCell(`E${salto}`).value = E41;
        workBook.worksheets[0].getCell(`F${salto}`).value = F41;
        workBook.worksheets[0].getCell(`H${salto}`).value = H41;
        workBook.worksheets[0].getCell(`C${salto + 3}`).value = C44;
        workBook.worksheets[0].getCell(`D${salto + 3}`).value = D44;
        workBook.worksheets[0].getCell(`E${salto + 3}`).value = E44;
        workBook.worksheets[0].getCell(`C${salto + 5}`).value = C46;
    })
    .then(() => {
        //workBook.xlsx.writeFile(`planilha_${Date.now()}.xlsx`); // Salva um arquivo no sistema local
        return (workBook);
    })
    .catch(err => console.log(err));

    return saida;
    
}