const fs = require('fs');

const repository = require('../repositories/excel-repository');

exports.genExcelFile = async (req, res) => {
    try {
        await repository.genExcelFile(req.params.id)
        .then((workBook) => {
            res.setHeader('Content-Description', 'File Transfer');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment;', 'filename=' + '"Report.xlsx"');
            var fileName = String('GRD_' + Date.now() + '.xlsx');
            res.attachment(fileName)
            workBook.xlsx.write(res)
            .then(() => {
                res.end();
            });
        })
        .catch(err => {console.log(err)});
        
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao gerar o Excel!'
        });
        console.log(e);
    }
};