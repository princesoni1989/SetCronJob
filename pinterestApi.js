/**
 * Created by root on 29/12/15.
 */
'use strict';
var request = require('request');
var util = require('util');
var fs = require('fs');

/**
 *	Variable for api use.
 */
var oAuthRedirectUrlTemplate = 'https://api.pinterest.com/oauth/?response_type=%s&redirect_uri=%s&client_id=%s&scope=%s&state=%s',
  tokenRequestTemplate = 'https://api.pinterest.com/v1/oauth/token',
  version = 'v1',
  baseUrl = 'https://api.pinterest.com/' + version +'',
  response_type = { 'code': 'code' },
  scope = [ 'read_public,write_public' ],
  grant_type = { 'authorization_code': 'authorization_code' },
  __state = 'PR',
  boardUrls = {
    'GET_BOARD_BY_ID': '/boards/%s/',
    'GET_BOARD_PINS': '/boards/%s/pins/',
    'GET_MY_BOARDS': '/me/boards',
    FORM_BOARD_URL: function(type, boardId){
      if(type=='GET_BOARD_BY_ID' || type=='GET_BOARD_PINS'){
        return util.format(baseUrl+boardUrls[type], boardId);
      }
      return baseUrl + boardUrls[type];
    }
  },
  pinUrl = {
    'POST_PIN': '/pins/',

    FORM_PIN_URL: function(requestType, options){
      return baseUrl + pinUrl['POST_PIN'];
    }
  },
  Errors = {
    'No_Access_Token': 'Access Token not found!! Call setAccessToken(<token>)',
    'InvalidArgumets': 'Parameters are not valid.'
  };

/**
 * Pinterest Api object.
 */
var PinterestApi = function(){
  this.secret = null;
  this.clientId = null;
  this.redirectUrl = null;
  this.scope = null;
  this.token = null;
  this.__isConfigured = false;
};

/**
 *	Returns the all available scope against which we can make request.
 */
PinterestApi.prototype.getScopes = function() {
  return scope;
};

/**
 *	A setter function for setting the configuration parameter. This function is necessory to call before making use of rest of the functions.
 */
PinterestApi.prototype.setConfig = function(secret, clientId, redirectUrl, scope) {
  this.secret = secret;
  this.clientId = clientId;
  this.redirectUrl = redirectUrl;
  this.scope = scope;
  this.__isConfigured = true;
};

/**
 * Returns the redirect url. Call res.redirect(url) for authentication.
 */
PinterestApi.prototype.getPinterestRedirectUrl = function() {
  return util.format(oAuthRedirectUrlTemplate, response_type.code, this.redirectUrl, this.clientId, this.scope, __state);
};

/**
 * A setter function which injects the accesstoken to the {PinterestApi} object. Call this function as soon as you get access token.
 */
PinterestApi.prototype.setAccessToken = function(accessToken) {
  this.token = accessToken;
};

/**
 * This function returns the access token to the user.
 * @params
 * @authcode: Authenticaton code. This code is received upon successful redirection.
 * @callback: callback function. function(err, response, body)
 */
PinterestApi.prototype.getToken = function(authCode, callback) {
  var pinterestTokenRequest = {
    'url': 	tokenRequestTemplate,
    'method': 'post',
    qs: {
      'grant_type': grant_type.authorization_code,
      'client_id': this.clientId,
      'client_secret': this.secret,
      'code': authCode
    }
  }

  request(pinterestTokenRequest, callback);
};

/**
 * This function returns the all boards
 * @params:
 * @requestType: Type of request. GET_BOARD_BY_ID, GET_MY_BOARDS, GET_BOARD_PINS
 * @boardId: Id of the board
 * @callback: callback function. function(err, response, body)
 */
PinterestApi.prototype.getBoards = function(requestType, boardId, callback) {
  if(! this.token){
    throw new Error(Errors.No_Access_Token);
  }
  if(typeof boardId == 'function'){
    callback = boardId;
    boardId = null;
  }
  var allboardRequest = {
    method: 'get',
    url: boardUrls.FORM_BOARD_URL(requestType, boardId),
    'headers': {
      'Authorization': 'Bearer ' + this.token
    },
    qs: {
      'fields': 'image,counts,created_at,description,url,name,image'
    }
  };
  request(allboardRequest, function(err, response, body){
    if(!err && response.statusCode == 200){
        try{
          var mData = JSON.parse(body);
          callback(null, mData);
        }catch(e){
          callback(e, null);
        }
    }else{
      callback(err, null);
    }
  });
};

/**
 * This function post the pins on the board
 * @params:
 * @requestType: Type of request. DIRECT_UPLOAD, LINK_UPLOAD
 * @options: Object. {image: '', boardId: '', link: '', note: ''}
 * @callback: callback function. function(err, response, body)
 */
PinterestApi.prototype.addPin = function(requestType, options, callback) {
  if(! (this.token) ){
    throw new Error(Errors.No_Access_Token);
  }
  if((!requestType) || (!options.boardId) || (typeof callback !== 'function') || (!options.image)){
    throw new Error(Errors.InvalidArgumets);
  }
  var postPinRequest = {
    'method': 'post',
    'url': pinUrl.FORM_PIN_URL(),
    'headers': {
      'Authorization': 'Bearer ' + this.token
    }
  }
  var form = {
    board: options.boardId,
    note: options.note || 'with <3 from practiceretriever',
    link: options.link || 'https://www.practiceretriever.com'
  }

  if(requestType == PinterestApi.PIN_TYPES.FROM_DEVICE){
    postPinRequest.formData = form;
    postPinRequest.formData.image = fs.createReadStream(options.image);
  }else if(requestType == PinterestApi.PIN_TYPES.FROM_URL){
    postPinRequest.body = form;
    postPinRequest.body.image = options.image;
  }

  request(postPinRequest, callback);
};

PinterestApi.BOARD_TYPES = {
  'GET_BOARD_BY_ID' :'GET_BOARD_BY_ID',
  'GET_BOARD_PINS' : 'GET_BOARD_PINS',
  'GET_MY_BOARDS' : 'GET_MY_BOARDS'
};

PinterestApi.PIN_TYPES = {
  'FROM_DEVICE' :'DIRECT_UPLOAD',
  'FROM_URL' : 'LINK_UPLOAD'
};

module.exports = PinterestApi;
// var api = new PinterestApi();
// api.setAccessToken('AQQqJ5wmSpAyQKKoW8oVOZCQpyLCFCSbx5gpUTtCvzpGwKApngAAAAA');
// api.getBoards('GET_MY_BOARDS', console.log);


// board id = 513340126215434483
