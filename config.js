// Create and export config variables

//Container for all env
let environments = {};

// Staging (default)
environments.staging = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'staging'
};

// Prod object
environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production'
};

//  Determine which env was passed as comand

let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '.';

//check if current env is one of our env above or default to staging

let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


//Export the module
module.exports = environmentToExport;