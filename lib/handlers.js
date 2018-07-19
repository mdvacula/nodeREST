// These are the Request handlers
// 

// Dependencies


// Define Handlers
let handlers = {};

handlers.ping = (data, callback) => {
    callback(200);
}

//Not found handler
handlers.notFound = (data, callback) =>{
    callback(404);

};

module.export = handlers;