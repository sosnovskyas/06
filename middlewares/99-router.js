'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('koa-router');
const router = new Router();

/*
 async function *isAuthenticated(next) {
 if (!ctx.isAuthenticated) {
 ctx.throw(403);
 } else {
 await next();
 }
 }
 */

const customRoutesPath = '/../routes';
const customRoutes = fs.readdirSync(path.join(__dirname, customRoutesPath));

customRoutes.forEach(customRoute => {
  const r = require('../routes/'+customRoute).route;
  router[r.metod](r.path, r.handler);
});


exports.init = app => app.use(router.routes());
