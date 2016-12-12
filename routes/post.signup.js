'use strict';
const User = require('../models/user');
const pick = require('lodash/pick');

const handler = async(ctx, next) => {

  let user = await User.create(ctx.request.body);

  // userSchema.options.toObject.transform hides __v
  ctx.body = user.toObject();
};

exports.route = {
  metod: 'post',
  path: '/signup',
  handler: handler
};
