global.expect = require("chai").expect;
global.assert = require("chai").assert;
global.should = require('chai').should;

const iotcoap         = require('../index');

iotcoap.run();
iotcoap.rest.run();