
const NodeOAuthServer = require('oauth2-server');
const model = require('./model');

const Request = require('oauth2-server').Request;
const Response = require('oauth2-server').Response;

const oauth = new NodeOAuthServer({
    model:model,
    grants: ['password'],
    debug: true,
    requireClientAuthentication:{
      password:false
    }
  });

function newResponse(res){
  //see https://github.com/Azard/egg-oauth2-server/issues/11
  const newResponse = {
      headers: {}
    };
    for (var property in res) {
      if (res.hasOwnProperty(property) && !newResponse[property]) {
        newResponse[property] = res[property];
      }
    }
    for (var field in res.headers) {
        newResponse.headers[field.toLowerCase()] = res.headers[field];
    }
    return newResponse;
}
module.exports = {
  token: async function(ctx){
    let req = new Request(ctx.request);
    let res = new Response(newResponse(ctx.response));
    req.body = req.body.post;
    console.log('====',req.body);
    let data= await oauth.token(req,res);
    return data;
  },
  owToken: async function(ctx, password){
    let req = new Request(ctx.request);
    let res = new Response(newResponse(ctx.response));
    req.body = req.body.post;
    req.body.password = password;
    console.log('====',req.body);
    let data= await oauth.token(req,res);
    delete data.client;
    delete data.user;
    return data;
  }
}