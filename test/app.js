"use strict";

const td = require( "testdouble" );
td.replace( "hapi-pino" );
require( "dotenv" ).config();
const { expect } = require( "code" );
const Lab = require( "lab" );

const app = require( "../src/app" );

const lab = exports.lab = Lab.script();
const { describe, it } = lab;

describe( "App", () => {
    it( "home page returns valid response", async () => {
        const server = await app.createServer( { port: 12345 } );
        await server.initialize();
        const res = await server.inject( {
            url: "/",
            method: "GET"
        } );
        expect( res.statusCode ).to.equal( 200 );
        expect( res.result ).to.exist();
        expect( res.result ).to.contain( "My first hapi server!" );
    } );
} );
