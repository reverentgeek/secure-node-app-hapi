"use strict";

const Hapi = require( "hapi" );

const port = 8080;
const server = Hapi.server( { port } );

// Define a route for the URL http://localhost:8080/
server.route( {
    method: "GET",
    path: "/",
    handler: () => {
        // a handler can return text, HTML, JSON,
        // a file, or just about anything
        return "My first hapi server!";
    }
} );

const start = async () => {
    try {
        // start the server
        await server.start();
        console.log( `Server running at http://localhost:${ port }` ); // eslint-disable-line
    } catch ( err ) {
        console.log( err ); // eslint-disable-line
        process.exit( 1 ); // eslint-disable-line
    }
};

start();
