'use strict';
const should = require('should');

should(process.env.NODE_ENV).eql('test');

const config = require('config');
// const server = require('../server');
const request = require('request-promise').defaults({
  simple: false,
  resolveWithFullResponse: true,
  encoding: null
});

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const commonUrl = `http://${config.host}:${config.port}/api/`;
const dbUrl = `mongodb://${config.mongoose.uri}`;

// let app;
describe("mongo", () => {
  /* eslint prefer-arrow-callback: 2 */
  before(async() => {
    mongoose.Promise = Promise;
    mongoose.connect(dbUrl);

    let Users;

    try {
      Users = mongoose.model('users')
    } catch (error) {
      Users = require('../models/user');
    }

    let user = new Users({
      _id: ObjectId('57ffe7300b863737ddfe9a39'),
      displayName: 'alex',
      gender: 'M',
      email: 'q@pukin.ru',
      passwordHash: '123',
      salt: '123'
    });

    try {
      await
        mongoose.connection.dropDatabase();
    } catch (e) {
      throw `before hook: ошибка сброса базы данных: ${e}`
    }

    try {
      await
        user.save();
    } catch (e) {
      throw `befor hook: ошибка создания пользователей: ${e}`
    }


  });
  after(async() => {
    await mongoose.disconnect();
  });

  context("reg user", () => {
    it(`POST ${commonUrl + 'users'} must return status 200 and add user to DB`, async() => {

    });
  });
});
// describe("server api", () => {
//   beforeEach(async() => {
//     mongoose.Promise = Promise;
//     mongoose.connect(dbUrl);
//
//     let Users;
//
//     try {
//       Users = mongoose.model('users')
//     } catch (error) {
//       Users = require('../modules/db/users');
//     }
//
//     let user = new Users({_id: ObjectId('57ffe7300b863737ddfe9a39'), name: 'alex', gender: 'M', email: 'q@pukin.ru'});
//
//     try {
//       await mongoose.connection.dropDatabase();
//     } catch (e) {
//       throw `before hook: ошибка сброса базы данных: ${e}`
//     }
//
//     try {
//       await user.save();
//     } catch (e) {
//       throw `befor hook: ошибка создания пользователей: ${e}`
//     }
//   });
//
//   afterEach(async() => {
//     await mongoose.disconnect();
//   });
//
//   describe("GET", () => {
//
//     context("users list", () => {
//       it(`${commonUrl + 'users'} must return status 200`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users'
//         });
//         response.should.not.throw();
//         response.statusCode.should.equal(200);
//       });
//
//       it(`${commonUrl + 'users'} must return users`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users',
//           json: true
//         });
//
//         should(response.body).containDeep([
//           {
//             _id: ObjectId('57ffe7300b863737ddfe9a39'),
//             gender: 'M',
//             email: 'q@pukin.ru'
//           }
//         ]);
//       });
//     });
//
//     context("user not exist", () => {
//       it(`${commonUrl + 'users/000000000000000000000000'} must return 404`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users/000000000000000000000000'
//         });
//
//         should(response.statusCode).equal(404);
//       });
//     });
//
//     context("users 57ffe7300b863737ddfe9a39", () => {
//       it(`${commonUrl + 'users/57ffe7300b863737ddfe9a39'} must return status 200`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users/57ffe7300b863737ddfe9a39'
//         });
//         should(response).not.throw();
//         should(response.statusCode).equal(200);
//       });
//
//       it(`${commonUrl + 'users'} must return user {"_id":"57ffe7300b863737ddfe9a39","gender":"M"}`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users',
//           json: true
//         });
//
//         should(response.body).containDeep([
//           {
//             "_id": "57ffe7300b863737ddfe9a39",
//             "gender": "M"
//           }
//         ]);
//
//       });
//     });
//
//     context("bad user ID format", () => {
//       it(`${commonUrl + 'users/qwe'} must return 415`, async() => {
//         let response = await request({
//           method: 'GET',
//           uri: commonUrl + 'users/qwe'
//         });
//
//         should(response.statusCode).equal(415);
//       });
//     });
//   });
//
//   describe("POST", () => {
//     context("add normal user", () => {
//       it(`${commonUrl}users must return status 200`, async() => {
//         let response = await request({
//           method: 'POST',
//           uri: `${commonUrl}users`,
//           form: {
//             'name': 'alex',
//             'email': 'alex@mail.me'
//           },
//         });
//
//         should(response.statusCode).equal(200);
//       });
//     });
//
//     context("add BAD user data", () => {
//       it(`${commonUrl}users whithout email must return 400`, async() => {
//         let response = await request({
//           method: 'POST',
//           uri: `${commonUrl}users`,
//           form: {
//             'name': 'alex'
//           },
//         });
//
//         should(response.statusCode).equal(400);
//       });
//     });
//   });
//
//   describe("PATCH", () => {
//     context("modify user 57ffe7300b863737ddfe9a39", () => {
//       it(`${commonUrl}user/57ffe7300b863737ddfe9a39 must return status 200`, async() => {
//         let response = await request({
//           method: 'PATCH',
//           uri: `${commonUrl}users/57ffe7300b863737ddfe9a39`,
//           form: {
//             'name': 'derex',
//           },
//         });
//
//         should(response.statusCode).equal(200);
//       });
//
//       it(`${commonUrl}users/57ffe7300b863737ddfe9a39 must return new name and gender`, async() => {
//         let response = await request({
//           method: 'PATCH',
//           uri: `${commonUrl}users/57ffe7300b863737ddfe9a39`,
//           form: {
//             'name': 'molex',
//             'gender': 'F',
//           },
//         });
//
//         should(JSON.parse(response.body)).containEql({"gender": "F", 'name': 'molex'});
//       });
//     });
//   });
// });