// request/response logger
const logger = require('koa-logger');
const convert = require('koa-convert');

exports.init = app => app.use(convert(logger()));
