const api = (module.exports = require("express").Router());

api.get("/*", (req, res, next) => {
  const path = req.params[0];
  return res.send(require("./faker/get/api/" + path));
});

api.post("/*", (req, res, next) => {
  const path = req.params[0];
  return res.send(require("./faker/post/api/" + path));
});

api.put("/*", (req, res, next) => {
  const path = req.params[0];
  return res.send(require("./faker/put/api/" + path));
});

api.delete("/*", (req, res, next) => {
  const path = req.params[0];
  return res.send(require("./faker/delete/api/" + path));
});
