var liveServer = require("live-server");

var params = {
    port: 4200,
    host: "0.0.0.0",
    root: "./src"
};

liveServer.start(params);