var express = require('express');
var formidable = require('formidable');
var mongoose = require('mongoose');
var grid = require('gridfs-stream');
var fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

var app = express();

const port = 8000;

grid.mongo = mongoose.mongo;
const conn = mongoose.createConnection(process.env.DATABASE_CONNECTION_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Rota de uma chamada POST
app.post('/fileupload', function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/data";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (!err) {
            console.log('File uploaded : ' + files.file.path);
            conn.createCollection('Files');
            conn.db.databaseName = 'Files';
            const gfs = grid(conn.db);
            const writestream = gfs.createWriteStream({
                filename: files.file.name
            });
            fs.createReadStream(files.file.path).pipe(writestream);
        }        
    });
    form.on('end', function() {        
        res.send('Completed ..... go and check fs.files & fs.chunks in  mongodb');
    });

});

app.get('/fileupload', (req, res) => {

});

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

app.listen(port, function() {
    console.log(`Express is listening on port ${port}`);
});