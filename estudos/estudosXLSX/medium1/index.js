// Módulo para monitorar a pasta com arquivo de programação
const fs = require('fs');

// Módulo para leitura do xlsx
const xlsx = require('node-xlsx');
const path = require('path');

// Módulo para trabalhar com datas
const moment = require('moment');

// Converter datas excel para js
const { getJsDateFromExcel } = require('excel-date-to-js');

// Caminho do arquivo a xlsx a ser lido
const filePath = path.join(__dirname, '..', '/teste.xlsx');

// Função que irá converter as datas do excel para o formato YYYYMMDD
function excelDateToJSDate(date) {
    let data = getJsDateFromExcel(date);
    return moment(data).utc().format("YYYYMMDD");
}

// Função para retornar apenas valores existentes do .map
const identity = x => x;

// Usaremos esta função do node (fs.watchFile), para ficar monitorando alterações no arquivo, assim toda vez que algo for alterado e salvo, as funções serão executadas e os dados inseridos no banco
fs.watchFile(filePath, function() {
    console.log(`Programação Alterada em ${new Date()}`);

    // Lendo a planilha
    const plan = xlsx.parse(filePath);

    // Trabalhando as informações para enviar ao banco
    const finalData = plan[0].data
        .map(([_, COD_FAMILIA, excelDate]) => {
            const DT_PROG = excelDateToJSDate(excelDate)

            if (DT_PROG !== 'Invalid date') {
                return { COD_FAMILIA, DT_PROG }
            }
        })
        .filter(identity);
})