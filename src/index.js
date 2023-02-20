var liveServer = require("live-server");

var params = {
    port: 4200,
    host: "0.0.0.0",
    // get the root of the project
    root: __dirname
};

liveServer.start(params);