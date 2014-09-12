const db_helper = require('./db_helper.js')
const _			= require("underscore");

function http_helper(){

}

http_helper.post_id = function (req, res, next) {
	db_helper.post_id(req, function(e){
		res.send(e);
		console.log('post_id: ' + e);
		next();
	})
};

http_helper.put_id = function (req, res, next) {
	db_helper.put_id(req, function(e){
		res.send(e);
		console.log('put_id: ' + e);
		next();
	})
};

http_helper.get_id = function (req, res, next) {
	db_helper.get_id(req, function(e){
		res.send(e);
		console.log('get_id: ' + e);
		next();
	})
};

http_helper.del_id = function (req, res, next) {
	db_helper.del_id(req, function(e){
		res.send(e);
		console.log('del_id: ' + e);
		next();
	})
};

http_helper.get_ids = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('get_ids: ' + e);
		next();
	})
};

http_helper.post_ch = function (req, res, next) {
	db_helper.post_ch(req, function(e){
		res.send(e);
		console.log('post_ch: ' + e);
		next();
	})
};

http_helper.put_ch = function (req, res, next) {
	db_helper.put_ch(req, function(e){
		res.send(e);
		console.log('put_ch: ' + e);
		next();
	})
};

http_helper.get_ch = function (req, res, next) {
	db_helper.get_ch(req, function(e){
		res.send(e);
		console.log('get_ch: ' + e);
		next();
	})
};

http_helper.del_ch = function (req, res, next) {
	db_helper.del_ch(req, function(e){
		res.send(e);
		console.log('del_ch: ' + e);
		next();
	})
};

http_helper.get_chs = function (req, res, next) {
	db_helper.get_chs(req.url, function(e){
		res.send(e);
		console.log('get_chs: ' + e);
		next();
	})
};

http_helper.response = function(req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(JSON.parse(e));
		next();
	})
};

http_helper.get_response = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(e);
		console.log('get_response: ' + e);
		next();
	})
};

http_helper.post_response = function (req, res, next) {
	var data=[];
	_.each((req.params), function(key,value){
		if(typeof key === "string"){
			key = "'" + key + "'";
		}
		data.push(key);
	});
	db_helper.syncData(data, function(e){
		res.send({});
		next();
	})
};


http_helper.del_response = function (req, res, next) {
	db_helper.urlQueryData(req.url, function(e){
		res.send(JSON.parse(e));
		next();
	})
};

module.exports = http_helper;
