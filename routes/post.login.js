'use strict';

const handler = async(ctx, next) => {
  ctx.body = ctx.render('login');

};

exports.route = {
  metod: 'post',
  path: '/login',
  handler: handler
};