global.expect = require("chai").expect;
global.assert = require("chai").assert;
global.should = require('chai').should;
global.callback = require('chai').callback;

var DB             =require("../lib/database/sqlite_helper")
    ,sqlite        = new DB();

sqlite.init();
