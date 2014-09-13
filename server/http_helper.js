const db_helper = require('./db_helper.js')
const _			= require("underscore");

function http_helper(){

}

http_helper.post_device = function (req, res, next) {
	db_helper.post_device(req, function(e){
		res.send(e);
		console.log('post_device: ' + e);
		next();
	})
};

http_helper.put_device = function (req, res, next) {
	db_helper.put_device(req, function(e){
		res.send(e);
		console.log('put_device: ' + e);
		next();
	})
};

http_helper.get_device = function (req, res, next) {
	db_helper.get_device(req, function(e){
		res.send(e);
		console.log('get_device: ' + e);
		next();
	})
};

http_helper.del_device = function (req, res, next) {
	db_helper.del_device(req, function(e){
		res.send(e);
		console.log('del_device: ' + e);
		next();
	})
};

http_helper.get_devices = function (req, res, next) {
	db_helper.urlQueryData(req, function(e){
		res.send(e);
		console.log('get_devices: ' + e);
		next();
	})
};

http_helper.post_channel = function (req, res, next) {
	db_helper.post_channel(req, function(e){
		res.send(e);
		console.log('post_channel: ' + e);
		next();
	})
};

http_helper.put_channel = function (req, res, next) {
	db_helper.put_channel(req, function(e){
		res.send(e);
		console.log('put_channel: ' + e);
		next();
	})
};

http_helper.get_channel = function (req, res, next) {
	db_helper.get_channel(req, function(e){
		res.send(e);
		console.log('get_channel: ' + e);
		next();
	})
};

http_helper.del_channel = function (req, res, next) {
	db_helper.del_channel(req, function(e){
		res.send(e);
		console.log('del_channel: ' + e);
		next();
	})
};

http_helper.get_channels = function (req, res, next) {
	db_helper.get_channels(req, function(e){
		res.send(e);
		console.log('get_channels: ' + e);
		next();
	})
};

http_helper.post_datapoint = function(req, res, next) {
	db_helper.post_datapoint(req, function(e){
		res.send(e);
		console.log('post_datapoint: ' + e);
		next();
	})
};

http_helper.put_datapoint = function (req, res, next) {
	db_helper.put_datapoint(req, function(e){
		res.send(e);
		console.log('put_datapoint: ' + e);
		next();
	})
};

http_helper.get_datapoint = function (req, res, next) {
	db_helper.get_datapoint(req, function(e){
		res.send(e);
		console.log('get_datapoint: ' + e);
		next();
	})
};


http_helper.del_datapoint = function (req, res, next) {
	db_helper.del_datapoint(req, function(e){
		res.send(e);
		console.log('del_datapoint: ' + e);
		next();
	})
};

http_helper.get_datapoints = function (req, res, next) {
	db_helper.get_datapoints(req, function(e){
		res.send(e);
		console.log('get_datapoints: ' + e);
		next();
	})
};

module.exports = http_helper;
