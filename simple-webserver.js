#!/usr/bin/env node
// a simple http server, i run it locally as a daemon so i can quickly access the processed db
// and lookup entries with a keyboard shortcut
const knowledge = require('./index');
knowledge.load();

const http = require('http');
const server = http.createServer(async(req, res) => {
  const query = req.url.substr(1);
  const result = await knowledge.searchForArticle(query);
  res.statusCode = 200;
  res.write(JSON.stringify(result));
  res.end();
});
server.listen(16389);
