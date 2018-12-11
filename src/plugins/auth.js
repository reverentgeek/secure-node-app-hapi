"use strict";

const bell = require( "bell" );
const authCookie = require( "hapi-auth-cookie" );

const isSecure = process.env.NODE_ENV === "production";

module.exports.register = async server => {
    // register plugins
    await server.register( [ authCookie, bell ] );

    // configure cookie authorization strategy
    server.auth.strategy( "session", "cookie", {
        password: process.env.COOKIE_ENCRYPT_PWD,
        redirectTo: "/authorization-code/callback", // If there is no session, redirect here
        isSecure // Should be set to true (which is the default) in production
    } );

    // configure bell to use your Okta authorization server
    server.auth.strategy( "okta", "bell", {
        provider: "okta",
        config: { uri: process.env.OKTA_ORG_URL },
        password: process.env.COOKIE_ENCRYPT_PWD,
        isSecure,
        location: process.env.HOST_URL,
        clientId: process.env.OKTA_CLIENT_ID,
        clientSecret: process.env.OKTA_CLIENT_SECRET
    } );
};
