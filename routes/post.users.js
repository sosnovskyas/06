'use strict';
const User = require('../models/user');

const handler = async(ctx, next) => {

  let user = await User.create(pick(ctx.request.body, User.publicFields));

  // userSchema.options.toObject.transform hides __v
  ctx.body = user.toObject();
};

exports.route = {
  metod: 'post',
  path: '/users',
  handler: handler
};
