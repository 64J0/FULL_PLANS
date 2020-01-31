/* 
    Código baseado no post:
    http://niralar.com/mongodb-gridfs-using-mongoose-on-nodejs/

    GridFS is MongoDB’s solution for storing and retrieving files that exceed the BSON-document size limit of 16 MB. Instead of storing a file in a single document, GridFS divides the file into parts, or chunks, and stores each chunk as a separate document.
*/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Especifica qual o nome do arquivo no banco de dados
var db_filename = "demo.jpg";

// Especifica qual o nome do arquivo que será buscado no computador do usuário
var local_file = "./Koala.jpg";

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error: '));
connection.once('open', function () {

    var gfs = gridfs(connection.db);

    app.get('/', function (req, res) {
        res.send('Demo of MongoDB - GridFS');
    });

    // Writing a file from local to MongoDB
    app.get('/write', function (req, res) {
        var writeStream = gfs.createWriteStream({ filename: db_filename });
        fs.createReadStream(local_file).pipe(writeStream);
        writeStream.on('close', function (file) {
            res.send('File Created : ' + file.filename);
        });
    });

    // Reading a file from MongoDB
    app.get('/read', function (req, res) {
        // Check file exist on MongoDB
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File not found');
            } else {
                var readStream = gfs.createReadStream({ filename: db_filename });
                readStream.pipe(res);
            }
        });
    });

    // Delete a file from MongoDB
    app.get('/delete', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File not found');
            } else {
                gfs.remove({ filename: db_filename }, function (err) {
                    if(err) res.send(err);
                    res.send('File deleted');
                });
            }
        });
    });

    // Get file information (File Meta Data) from MongoDB
    app.get('/meta', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if(err || !file) {
                res.send('File not found');
            } else {
                gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
                    if(err) res.send(err);
                    res.send(files);
                });
            }
        });
    });

    app.listen(3000, () => console.log('Example app listening on port 3000!'));

    /*
        By default GridFS will store files on default MongoDB collections(fs), If you need to store your files on custom collection, Replace GridFS options { filename: db_filename } to { filename: db_filename, root: 'myFiles' }.
    */

});