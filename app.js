'use strict';

const path = require('path');
const fs = require('fs');

const Koa = require('koa');
const app = module.exports = new Koa();

const mongoose = require('./libs/mongoose');

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(middleware => require('./middlewares/' + middleware).init(app));