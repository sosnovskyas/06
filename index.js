'use strict';

if (process.env.TRACE) {
  require('./libs/trace');
}

const config = require('config');
const path = require('path');
const fs = require('fs');

const Koa = require('koa');
const app = new Koa();

const mongoose = require('./libs/mongoose');

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(middleware => require('./middlewares/' + middleware).init(app));

app.listen(config.app.port);