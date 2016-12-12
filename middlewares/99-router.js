'use strict';

const fs = require('fs');
const path = require('path');

const Router = require('koa-router');
const router = new Router();

const mongoose = require('mongoose');
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
  const r = require('../routes/' + customRoute).route;
  router[r.metod](r.path, r.handler);
});

router.param('userById', async (id, ctx, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.userById = await User.findById(id);

  if (!ctx.userById) {
    ctx.throw(404);
  }

  await next();
});

exports.init = app => app.use(router.routes());
