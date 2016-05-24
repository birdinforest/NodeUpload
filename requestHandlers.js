// var exec = require("child_process").exec;

var queryString = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

var uploadPath = "./tmp/";

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    var body = 
        '<html>' +
        '<head>' +
            '<meta http-equiv="content-type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
                '<input type="file" name="upload">' +
                '<input type="submit" name="Upload file"/>' +
            '</form> ' +
        '</body>' +
        '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    
    var form = new formidable.IncomingForm();
    
    // Set upload dir.
    form.uploadDir = uploadPath;
    
    console.log("about to parse");
    
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        
        // Another solution: copy file from source dir to destination dir
        // var sourcePath = files.upload.path;
        // var is = fs.createReadStream(sourcePath);
        // var os = fs.createWriteStream(destinationPath + 'test.png');
        // is.pipe(os);
        // is.on('end', function () {
        //     fs.unlinkSync(files.upload.path);
        // })
        
        fs.renameSync(files.upload.path, uploadPath + "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile(uploadPath + "test.png", "binary", function (error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
