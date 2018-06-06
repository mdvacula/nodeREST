// Primary file for API

// Dependecies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//create server
let server = http.createServer((req, res)=> {
    // Get parsed Url
    let parsedUrl = url.parse(req.url, true);
    
    //get path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //query string as object
    let queryStringObject = parsedUrl.query;
    
    //Get the Http Method
    let method = req.method.toLowerCase();

    //Get headers as an object
    let headers = req.headers;

    //Get payload if there is any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data)=>{
        buffer += decoder.write(data)
    });
    req.on('end', () =>{
        buffer += decoder.end();
        
        //Chose handler for request
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //Construct the data object

        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        //Route the request to the handler
        chosenHandler(data, (statusCode, payload) => {
            //Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            
            //Use the payload called back by the handler, or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            //COnver the payload to a string
            let payloadString = JSON.stringify(payload);

            //Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);

            res.end(payloadString);

            console.log('Returning this response: ', statusCode)
        });

    });

});

// Start the server
server.listen(3000, () =>{
    console.log("Server is Listening on port 3000");
});

// Define Handlers
let handlers = {};

handlers.sample = (data, callback) =>{
    //Callback a http status code, and a payload object
    callback(406, {'name' : 'sample handler'});
};

//Not found handler
handlers.notFound = (data, callback) =>{
    callback(404);

};


let router = {
    'sample' : handlers.sample
}