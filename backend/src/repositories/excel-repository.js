const path = require("path");
const ExcelJS = require("exceljs");
const mongoose = require("mongoose");

const Projetos = mongoose.model("Projetos");

const filePath = path.resolve(__dirname, "../assets/teste.xlsx");

exports.genExcelFile = async ({ projectId }) => {
  const foundProject = await Projetos.findById(projectId);

  const workBook = new ExcelJS.Workbook();

  const editedSpreadsheet = await workBook.xlsx
    .readFile(filePath)
    .then(function (workBook) {
      workBook.lastModifiedBy = "ADM Full Engenharia";
      workBook.modified = new Date();

      let firstPage = workBook.worksheets[0];

      // Título da GRD
      firstPage
        .getCell("C3")
        .alignment = ({
          vertical: "middle",
          horizontal: "center",
        });

      // Célula de cliente
      firstPage
        .getCell("D5")
        .value = foundProject.cliente;
      firstPage
        .getCell("D5")
        .alignment = ({
          vertical: "middle",
          horizontal: "left",
        });

      // Célula do responsável
      firstPage
        .getCell("C11")
        .value = "Responsável pelo Projeto:";
      firstPage
        .getCell("C11")
        .alignment = ({
          vertical: "middle",
          horizontal: "right",
        });
      firstPage
        .getCell("D11")
        .value = foundProject.responsavel;

      // Célula de quantidade de desenhos
      firstPage
        .getCell("D20")
        .value = parseInt(
          foundProject.infoProjetos.length
        );

      // Célula com o número do pedido e o nome do Projeto
      firstPage
        .getCell("D24")
        .value = `${foundProject.numPedido} - ${foundProject.nomeProjeto}`;

      // Salva os valores do inferior da planilha para
      // serem reutilizados posteriormente.
      const C41 = firstPage.getCell("C41").value;
      firstPage.getCell("C41").value = "";
      const H41 = firstPage.getCell("H41").value;
      firstPage.getCell("H41").value = "";
      const C44 = firstPage.getCell("C44").value;
      firstPage.getCell("C44").value = "";
      const D44 = firstPage.getCell("D44").value;
      firstPage.getCell("D44").value = "";
      const E44 = firstPage.getCell("E44").value;
      firstPage.getCell("E44").value = "";
      const C46 = firstPage.getCell("C46").value;
      firstPage.getCell("C46").value = "";

      const ASCIICodeOfB = "B".charCodeAt(0);
      const ASCIICodeOfL = "L".charCodeAt(0);
      const limiteAux2 = ASCIICodeOfL - ASCIICodeOfB;
      let varColNum;
      let varColStr;
      let str;
      let soma;
      const borderStyles = {
        top: {
          style: "thin",
          color: { argb: "FF000000" }
        },
        left: {
          style: "thin",
          color: { argb: "FF000000" }
        },
        bottom: {
          style: "thin",
          color: { argb: "FF000000" }
        },
        right: {
          style: "thin",
          color: { argb: "FF000000" }
        },
      };
      const fontStyleBold = {
        bold: true,
      };

      // Preenche os dados de cada desenho do projeto
      for (let cont = 0; cont < foundProject.infoProjetos.length; cont++) {
        // índice mostrado na lateral para indicar quantos desenhos tem no projeto
        firstPage.getCell(`B${cont + 34}`).value = parseInt(
          `${cont + 1}`
        );

        // Célula com o valor do número do fornecedor
        firstPage.getCell(`C${cont + 34}`).value =
          foundProject.infoProjetos[cont].numFull;

        // Célula com o valor do número do cliente
        firstPage.getCell(`D${cont + 34}`).value =
          foundProject.infoProjetos[cont].numCliente;

        // Célula com o valor da revisão
        firstPage.getCell(`E${cont + 34}`).value =
          foundProject.infoProjetos[cont].revisao;

        // Célula com o valor do formato
        firstPage.getCell(`F${cont + 34}`).value =
          foundProject.infoProjetos[cont].formato;

        // Célula com o Título (Conteúdo do Documento)
        firstPage.getCell(`I${cont + 34}`).value =
          foundProject.infoProjetos[cont].descricao;

        // Célula com o valor do tipo de engenharia
        firstPage.getCell(`K${cont + 34}`).value =
          foundProject.infoProjetos[cont].tipoEngenharia;

        // Estilização da planilha B34:L34 ao longo das colunas de infoProjetos
        for (let aux2 = 0; aux2 <= limiteAux2; aux2++) {
          varColNum = ASCIICodeOfB + aux2;
          varColStr = String.fromCharCode(varColNum);
          soma = cont + 34;
          str = String(varColStr + soma);

          firstPage.getCell(str).style = {
            font: fontStyleBold,
            border: borderStyles,
          };

          if (aux2 <= 4 || aux2 >= 8) {
            // console.log(`Recebendo estilização de alinhamento: ${str}`);
            firstPage.getCell(str).alignment = {
              vertical: "middle",
              horizontal: "center",
            };
          } else if (aux2 === 7) {
            firstPage.getCell(str).alignment = {
              vertical: "middle",
              horizontal: "left",
            };
          }
        }
      }

      /*
            Adiciona novamente o final da planilha
        */
      const salto = foundProject.infoProjetos.length + 34 + 2;
      firstPage.getCell(`C${salto}`).value = C41;
      firstPage.getCell(`C${salto}`).alignment = {
        vertical: "middle",
        horizontal: "left",
      };
      firstPage.getCell(`H${salto}`).value = H41;
      firstPage.getCell(`C${salto + 3}`).value = C44;
      firstPage.getCell(`D${salto + 3}`).value = D44;
      firstPage.getCell(`E${salto + 3}`).value = E44;
      firstPage.getCell(`C${salto + 5}`).value = C46;

      // Estilização das células C19 até D22
      for (let cont = 19; cont <= 22; cont++) {
        firstPage.getCell(`C${cont}`).alignment = {
          vertical: "middle",
          horizontal: "left",
        };
        firstPage.getCell(`D${cont}`).alignment = {
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
  return ({ editedSpreadsheet, numGRD: foundProject.numGRD });
};
