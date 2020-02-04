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

let dbName = 'GridFS';

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
            '<p>Entre com o titulo da imagem</p>'+
            '<input type="text" name="title"><br>'+
            '<input type="file" name="upload" multiple="multiple"><br>'+
            '<input type="submit" value="Salvar informacoes">'+
            '</form>'
        );
    });
    
    // Rota de uma chamada POST
    app.post('/fileupload', function (req, res) {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
            if (!err) {
        
                fs.createReadStream(files.upload.path).
                pipe(bucket.openUploadStream(files.upload.name)).
                on('error', function(error) {
                    assert.ifError(error);
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
    
    app.get('/content', (req, res) => {
        /*
        let files = bucket.openDownloadStreamByName('Penguins.jpg').
        pipe(fs.createWriteStream('./output.jpg')).
        on('error', function(error) {
            assert.ifError(error);
        }).
        on('end', function() {
            console.log('done!');
            //process.exit(0);
        });
        */

        let files = bucket.openDownloadStreamByName('Penguins.jpg');

        console.log(files.s);
        res.send(`<img src="${files.path}" />`);
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