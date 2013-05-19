var http = require('http');
var UglifyJS = require('uglify-js');

http.createServer(function (req, res) {
    var code = '';
    
    var options = {};
    if (typeof options.fromString === 'undefined') {
      options.fromString = true;
    }
    options.output = options.output || {};
    if (typeof options.output.comments === 'undefined') {
      options.output.comments = /((@?license|copyright)|^!|@preserve|@cc_on)/i;
    }

    req.on('data', function (chunk) {
        code += chunk;
    });
    req.on('end', function () {
        res.writeHead(200);
        try {
		    //var uglified = uglify(code, options);
		    var uglified = UglifyJS.minify(code, options);
		    res.end(uglified.code);
		    console.log('Uglified ' + code.length + ' bytes to ' + uglified.code.length + ' bytes. ('+Math.round((code.length-uglified.code.length)*100/code.length)+'% reduction)');
		}
		catch (e) {
		    res.writeHead(500);
		    res.end();
			console.log('ERROR::'+e.message);
		}
    });
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');