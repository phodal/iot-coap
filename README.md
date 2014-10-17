
[![Build Status](https://api.travis-ci.org/gmszone/iot-coap.png)](https://travis-ci.org/gmszone/iot-coap)

[![NPM](https://nodei.co/npm/iot-coap.png)](https://nodei.co/npm/iot-coap/)

[![NPM](https://nodei.co/npm-dl/iot-coap.png)](https://nodei.co/npm/iot-coap/)

#CoAP物联网框架

这是一个开源的最小物联网系统的CoAP框架，如果你还是一个初学者建议用HTTP版 [https://github.com/gmszone/iot][iot]

##主要依赖库

 - [RESTify](https://github.com/mcavage/node-restify)
 - [Node-CoAP](https://github.com/mcollina/node-coap)
 - [Node Sqlite3](https://github.com/mapbox/node-sqlite3)
 - [MongoDB](https://github.com/mongodb/node-mongodb-native) 

##install

``注意``：windows系统npm install失败时，需要自己建立一个C:\Documents and Settings\[USERNAME]\Application Data\npm 文件
    
    npm install iot-coap

新建一个index.js

``注意``: 如果已经存在一个index.js文件，请将下面内容添加到文件末尾

    const iotcoap         = require('iot-coap');

    iotcoap.run();
    iotcoap.rest.run();

``注意``:在db配置可以选择mongodb和sqlite3，替换所需要的数据库即可。

创建iot.js

    exports.config  = {
        "db_name": "iot.db",
        "mongodb_name": "iot",
        "mongodb_documents": "iot",
        "db": "mongodb",
        "table_name": "basic",
        "keys":[
            "id",
            "value",
            "sensors1",
            "sensors2"
        ],
        "db_table": "id integer primary key, value text, sensors1 float, sensors2 float",
        "mongodb_init":[
            {
                id: 1,
                value: "is id 1",
                sensors1: 19,
                sensors2: 20
            },
            {
                id: 2,
                value: "is id 2",
                sensors1: 20,
                sensors2: 21
            }
        ],
        "init_table":[
            "insert or replace into basic (id,value,sensors1,sensors2) VALUES (1, 'is id 1', 19, 20);",
            "insert or replace into basic (id,value,sensors1,sensors2) VALUES (2, 'is id 2', 20, 21);"
        ],
        "query_table":"select * from basic;",
        "rest_url": "/id/:id",
        "rest_post_url": "/",
        "rest_port": 8848
    };

接着运行

    node index.js

##Test

###Firefox
    
1. 安装copper插件(下载地址:[https://addons.mozilla.org/en-US/firefox/addon/copper-270430/](https://addons.mozilla.org/en-US/firefox/addon/copper-270430/))

2. 选上Debug Contrl

3. 在Accept, Content-Format选application/json

###Node GET
    
    node method_test/get.js
    
###HTTP POST
    
    curl -H "Content-Type: application/json" -d '{"id":3, "value":"dream","sensors1":12,"sensors2":13}' http://localhost:8848

###在线测试

1. CoAP
修改url为

    coap://iot-coap.phodal.com

2. RESTful
修改url为

    http://iot-coap.phodal.com:8896

##配置开发环境

在代码提交之前会跑测试、jslint语法检查，相关机制可以查看这篇文章[nodejs jslint](https://www.phodal.com/blog/nodejs-add-jslint-with-pre-commit/)

这时需要保证的是pre-commit能生效，因而需要有

1. 安装有Nodejs的OS
2. clone完代码后执行npm install

##交流

QQ群：348100589

##文档

[CoAP与物联网系统][basic]

[物联网系统与CoAP之Hello,World][hello]

[CoAP与物联网系统之返回JSON][returnjson]

[CoAP与物联网系统之返回XML][returnxml]

[IoT CoAP 块传输——使用Block传输数据][iotblock]

[构建基于CoAP SQLite Nodejs的物联网之查询数据][querydb]

[构建基于CoAP SQLite Nodejs的物联网之数据库][db]


##IDE

感谢[JetBrains](http://www.jetbrains.com)为我们提供了数据不限的WebStorm的License。

## License

© 2014 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license.

[iot]: https://github.com/gmszone/iot
[basic]: http://www.phodal.com/blog/use-constrained-application-protocol-in-internet-of-things/
[hello]: http://www.phodal.com/blog/use-node-coap-create-a-coap-server/
[returnjson]: http://www.phodal.com/blog/use-coap-build-internet-of-things-return-json/
[querydb]: http://www.phodal.com/blog/use-node-coap-sqlite-create-a-coap-server-get-response/
[db]: http://www.phodal.com/blog/use-coap-nodejs-sqlite-build-iot/
[returnxml]: http://www.phodal.com/blog/use-jstoxml-convert-iot-coap-return-json/
[iotblock]: http://www.phodal.com/blog/use-coap-block-send-data-on-iot-coap/
