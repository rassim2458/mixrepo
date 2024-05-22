const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');


// create connection with MongoDB
const conn = mongoose.createConnection('mongodb://localhost/test');

let gfs;

conn.once('open', () => {
  // initialize GridFS
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost/test',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'uploads'
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });
