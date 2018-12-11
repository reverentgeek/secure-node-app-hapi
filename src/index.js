"use strict";

// Load in environment configuration
require( "dotenv" ).config();
const app = require( "./app" );

const DEFAULT_PORT = 8080;
const port = process.env.PORT || DEFAULT_PORT;
const config = { port };

const start = async () => {
    try {
        // create the server
        const server = await app.createServer( config );

        // start the server
        await server.start();
    } catch ( err ) {
        console.log( err ); // eslint-disable-line
        process.exit( 1 ); // eslint-disable-line
    }
};

start();
