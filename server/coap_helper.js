const db_helper = require('./db_helper.js');
const result_helper = require('./result_helper.js');

db_helper.initDB();

function coap_helper(){
}

coap_helper.post_device = function (req, res) {
    db_helper.post_device(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('post_device: ' + e);
    })
};

coap_helper.put_device = function (req, res) {
    db_helper.put_device(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('put_device: ' + e);
    })
};

coap_helper.get_device = function (req, res) {
    db_helper.get_device(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_device: ' + e);
    })
};

coap_helper.del_device = function (req, res) {
    db_helper.del_device(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('del_device: ' + e);
    })
};

coap_helper.get_devices = function (req, res) {
    db_helper.urlQueryData(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_devices: ' + e);
    })
};

coap_helper.post_channel = function (req, res) {
    db_helper.post_channel(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('post_channel: ' + e);
    })
};

coap_helper.put_channel = function (req, res) {
    db_helper.put_channel(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('put_channel: ' + e);
    })
};

coap_helper.get_channel = function (req, res) {
    db_helper.get_channel(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_channel: ' + e);
    })
};

coap_helper.del_channel = function (req, res) {
    db_helper.del_channel(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('del_channel: ' + e);
    })
};

coap_helper.get_channels = function (req, res) {
    db_helper.get_channels(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_channels: ' + e);
    })
};

coap_helper.post_datapoint = function(req, res) {
    db_helper.post_datapoint(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('post_datapoint: ' + e);
    })
};

coap_helper.put_datapoint = function (req, res) {
    db_helper.put_datapoint(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('put_datapoint: ' + e);
    })
};

coap_helper.get_datapoint = function (req, res, next) {
    db_helper.get_datapoint(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_datapoint: ' + e);
    })
};

coap_helper.del_datapoint = function (req, res, next) {
    db_helper.del_datapoint(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('del_datapoint: ' + e);
    })
};

coap_helper.get_datapoints = function (req, res) {
    db_helper.get_datapoints(req, function(e){
        result_helper.jsonAndCode(e, res);
        console.log('get_datapoints: ' + e);
    })
};

module.exports = coap_helper;