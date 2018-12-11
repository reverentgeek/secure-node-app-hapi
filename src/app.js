"use strict";

const Hapi = require( "hapi" );
const vision = require( "vision" );
const ejs = require( "ejs" );
const plugins = require( "./plugins" );
const routes = require( "./routes" );

module.exports.createServer = async config => {
    const server = Hapi.server( config );

    // add the vision plugin and
    // register EJS template view support
    await server.register( vision );
    server.views( {
        engines: { ejs },
        relativeTo: __dirname,
        path: "views",
        layout: true
    } );

    // register plugins
    await plugins.register( server );

    // register routes
    await routes.register( server );

    return server;
};
