/**
 * @upload File filter multer 
 * used as filter for uploading files
 */

export default function imageFileFilter(req, file, callback) {
    if (file.mimetype !== 'application/pdf' && 
        file.mimetype !== 'text/csv' && 
        file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && 
        file.mimetype !== 'image/png' && 
        file.mimetype !== 'image/jpg' && 
        file.mimetype !== 'image/jpeg' && 
        file.mimetype !== 'image/gif') {
      var err = new Error();
      err.code = 'UNSUPPORTED_MEDIA_TYPE';
      return callback(err, false);
    }
    callback(null, true);
  };
  
  