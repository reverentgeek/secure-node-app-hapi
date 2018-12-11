"use strict";

const blipp = require( "blipp" );
const pino = require( "hapi-pino" );
const serverStart = require( "./serverStart" );
const auth = require( "./auth" );

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
    await server.register( [ blipp, {
        plugin: pino,
        options: {
            prettyPrint: isDev,
            logEvents: [ "response" ]
        }
    }, {
        plugin: serverStart,
        options: {
            message: `My hapi server is running at ${ server.info.uri }`
        }
    } ] );
    await auth.register( server );
};
