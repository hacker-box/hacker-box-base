const express = require("express");
const configure = require("./configure");
const render = require("./render");
const handleError = require("./utils/errors");
const api = require("./api");

module.exports = configure(express()).then(server => {
  // Use the public directory for static files
  // This directory is created by webpack on build time.
  server.use(express.static(`${__dirname}/../dist`));

  // Mount api routes, errors are reported as JSON.
  server.use("/api", api, handleError);

  // Render the app server-side and send it as response.
  server.get("/*", render);

  return server;
});
