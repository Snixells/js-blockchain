const http = require('http');

http.createServer((request, response) => {
    // Puts 'header', 'method', and 'url' properties onto request object
    const { header, method, url } = request;
    // Creates the body array
    let body = [];

    // Implementing Blockchain functionality
    if (request.method === 'POST' && request.url === '/blockchain') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            response.end(body);
            
        });
    } else {
        response.statusCode = 404;
        response.end();
    }

    // // When an error occurs
    // request.on('error', (err) => {
    //     // Print it to the console
    //     console.error(err.stack);
    //     // When data is beeing sent
    // }).on('data', (chunk) => {
    //     // Push it to the end of body
    //     body.push(chunk);
    //     // And when the end is reached
    // }).on('end', () => {
    //     // Save the array as string to body
    //     body = Buffer.concat(body).toString;

    //     // Listening for response errors
    //     response.on('error', (err) => {
    //         console.log(err);
    //     });

    //     // Setting response Headers
    //     response.writeHead(200, {
    //         'Content-Type': 'application/JSON',
    //     });

    //     const responseBody = { header, method, url, body }

    //     // Setting response body
    //     response.write(JSON.stringify(responseBody));
    //     response.end();


    // });
}).listen(8080);
