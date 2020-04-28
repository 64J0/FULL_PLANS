const path = require("path");
const ExcelJS = require("exceljs");
const mongoose = require("mongoose");

const Projetos = mongoose.model("Projetos");

const filePath = path.resolve(__dirname, "../assets/teste.xlsx");

exports.genExcelFile = async (id) => {
  // Recupera os dados do projeto com o id informado no banco de dados
  const res = await Projetos.findById(id);

  // Inicia o processo de atualização nos dados da planilha com o módulo ExcelJS
  const workBook = new ExcelJS.Workbook();

  const saida = await workBook.xlsx
    .readFile(filePath)
    .then(function (workBook) {
      workBook.lastModifiedBy = "ADM Full Engenharia";
      workBook.modified = new Date();

      // Título da GRD
      workBook.worksheets[0].getCell("C3").alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      // Célula de cliente
      workBook.worksheets[0].getCell("D5").value = res.cliente;
      workBook.worksheets[0].getCell("D5").alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      // Célula do responsável
      workBook.worksheets[0].getCell("C11").value = "Responsável pelo Projeto:";
      workBook.worksheets[0].getCell("C11").alignment = {
        vertical: "middle",
        horizontal: "right",
      };
      workBook.worksheets[0].getCell("D11").value = res.responsavel;

      // Célula de quantidade de desenhos
      workBook.worksheets[0].getCell("D20").value = parseInt(
        res.infoProjetos.length
      );

      // Célula com o número do pedido e o nome do Projeto
      workBook.worksheets[0].getCell(
        "D24"
      ).value = `${res.numPedido} - ${res.nomeProjeto}`;

      /*
            Esta parte do código salva os valores encontrados na parte inferior da planilha para serem reutilizados posteriormente
        */
      const C41 = workBook.worksheets[0].getCell("C41").value;
      workBook.worksheets[0].getCell("C41").value = "";
      const H41 = workBook.worksheets[0].getCell("H41").value;
      workBook.worksheets[0].getCell("H41").value = "";
      const C44 = workBook.worksheets[0].getCell("C44").value;
      workBook.worksheets[0].getCell("C44").value = "";
      const D44 = workBook.worksheets[0].getCell("D44").value;
      workBook.worksheets[0].getCell("D44").value = "";
      const E44 = workBook.worksheets[0].getCell("E44").value;
      workBook.worksheets[0].getCell("E44").value = "";
      const C46 = workBook.worksheets[0].getCell("C46").value;
      workBook.worksheets[0].getCell("C46").value = "";

      const varAscii = "B".charCodeAt(0); // Retorna o código ASCII desse caractere
      const limiteAux2 = "L".charCodeAt(0) - varAscii;
      let varColNum;
      let varColStr;
      let str;
      let soma;
      const borderStyles = {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      };
      const fontStyle = {
        bold: true,
      };

      // Preenche os dados de cada desenho do projeto
      for (var aux = 0; aux < res.infoProjetos.length; aux++) {
        // índice mostrado na lateral para indicar quantos desenhos tem no projeto
        workBook.worksheets[0].getCell(`B${aux + 34}`).value = parseInt(
          `${aux + 1}`
        );

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

        // Célula com o Título (Conteúdo do Documento)
        workBook.worksheets[0].getCell(`I${aux + 34}`).value =
          res.infoProjetos[aux].descricao;

        // Célula com o valor do tipo de engenharia
        workBook.worksheets[0].getCell(`K${aux + 34}`).value =
          res.infoProjetos[aux].tipoEngenharia;

        // Estilização da planilha B34:L34 ao longo das colunas de infoProjetos
        for (let aux2 = 0; aux2 <= limiteAux2; aux2++) {
          varColNum = varAscii + aux2;
          varColStr = String.fromCharCode(varColNum);
          soma = aux + 34;
          str = String(varColStr + soma);

          workBook.worksheets[0].getCell(str).style = {
            font: fontStyle,
            border: borderStyles,
          };

          if (aux2 <= 4 || aux2 >= 8) {
            // console.log(`Recebendo estilização de alinhamento: ${str}`);
            workBook.worksheets[0].getCell(str).alignment = {
              vertical: "middle",
              horizontal: "center",
            };
          } else if (aux2 === 7) {
            workBook.worksheets[0].getCell(str).alignment = {
              vertical: "middle",
              horizontal: "left",
            };
          }
        }
      }

      /*
            Adiciona novamente o final da planilha
        */
      const salto = res.infoProjetos.length + 34 + 2;
      workBook.worksheets[0].getCell(`C${salto}`).value = C41;
      workBook.worksheets[0].getCell(`C${salto}`).alignment = {
        vertical: "middle",
        horizontal: "left",
      };
      workBook.worksheets[0].getCell(`H${salto}`).value = H41;
      workBook.worksheets[0].getCell(`C${salto + 3}`).value = C44;
      workBook.worksheets[0].getCell(`D${salto + 3}`).value = D44;
      workBook.worksheets[0].getCell(`E${salto + 3}`).value = E44;
      workBook.worksheets[0].getCell(`C${salto + 5}`).value = C46;

      // Estilização das células C19 até D22
      for (var aux = 19; aux <= 22; aux++) {
        workBook.worksheets[0].getCell(`C${aux}`).alignment = {
          vertical: "middle",
          horizontal: "left",
        };
        workBook.worksheets[0].getCell(`D${aux}`).alignment = {
          vertical: "middle",
          horizontal: "left",
        };
      }

      return workBook;
    })
    .then((workBook) => {
      // workBook.xlsx.writeFile(`planilha_${Date.now()}.xlsx`); // Salva um arquivo no sistema local
      return workBook;
    })
    .catch((err) => console.log(err));

  // Saida === workBook
  return { saida, numGRD: res.numGRD };
};
