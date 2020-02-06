const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const assert = require('assert');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(bodyParser.json());

let dbName = 'Arquivos';

const client = new mongo.MongoClient(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true
});

client.connect(function(error) {
    assert.ifError(error);
    console.log('Connection has been stablished!');

    const db = client.db(dbName);
    let bucket = new mongo.GridFSBucket(db);

    app.get('/', function(req, res){
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
            '<form action="/fileupload" enctype="multipart/form-data" method="post">'+
            '<h1>Formulario para testar a API</h1>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Salvar informacoes">'+
            '</form>'
        );
    });
    
    // Rota de uma chamada POST
    app.post('/fileupload', function (req, res) {
        const form = new formidable.IncomingForm();
        //form.encoding = 'utf-8';
        //form.uploadDir = './uploadData';
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
            if (!err) {
                
                fs.createReadStream(files.upload.path).
                pipe(bucket.openUploadStream(files.upload.name)).
                on('error', function(error) {
                    assert.ifError(error);
                }).
                on('progress', function(bytesReceived, bytesExpected) {
                    let percentage = Math.round(bytesReceived/bytesExpected);
                    if (percentage >= 90) {
                        console.log('It has been uploaded ' + Math.round(bytesReceived/bytesExpected) + '% of the total');
                    } else {
                        return null;
                    }
                }).
                on('finish', function() {
                    console.log('done!');
                    //process.exit(0);
                });

            }        
        });
        form.on('end', function() {        
            res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
            res.end();
        });
    
    });
    
    app.get('/content/:name', (req, res) => {

        bucket.openDownloadStreamByName(req.params.name).
        pipe(fs.createWriteStream('C:\\Users\\projetista11\\Desktop\\Programas\\FULL_PLANS-branchFull\\estudosGridFS\\downloads' + req.params.name)).
        on('error', function(error) {
            assert.ifError(error);
        }).
        on('end', function() {
            console.log('done!');
            res.send('done');
            //process.exit(0);
        });

    });

    app.get('/delete/:id', (req, res) => {

        let id = mongo.ObjectId(req.params.id);

        bucket.delete(id, (error) => {
            if (error) {
                console.log(error);
                res.send('Error on deleting a file');
            } else {
                console.log('Arquivo encontrado e deletado');
                res.send('File deleted');
            }
        });

    });

});

// ====================================================

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
