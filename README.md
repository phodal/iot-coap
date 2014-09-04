
[![Build Status](https://api.travis-ci.org/gmszone/iot-coap.png)](https://travis-ci.org/gmszone/iot-coap)


[![NPM](https://nodei.co/npm/iot-coap.png)](https://nodei.co/npm/iot-coap/)

[![NPM](https://nodei.co/npm-dl/iot-coap.png)](https://nodei.co/npm/iot-coap/)

#物联网系统 CoAP版

这是一个开源的最小物联网系统的CoAP版，如果你还是一个初学者建议用HTTP版 [https://github.com/gmszone/iot][iot]

##主要依赖库

 - RESTify
 - [Node-CoAP](https://github.com/mcollina/node-coap)
 - Node Sqlite3

##install

``注意``：windows系统npm install失败时，需要自己建立一个C:\Documents and Settings\[USERNAME]\Application Data\npm 文件
    
    npm install iot-coap

新建一个index.js

``注意``：如果已经存在一个index.js文件，请将下面内容添加到文件末尾

    const iotcoap         = require('iot-coap');

    iotcoap.run();
    iotcoap.rest.run(); //运行REST

创建iot.json

    {
        "db_name": "iot.db",
        "table_name": "basic",
        "key":[
            "id",
            "value",
            "sensors1",
            "sensors2"
        ],
        "db_table": "id integer primary key, value text, sensors1 float, sensors2 float",
        "init_table":[
            "insert or replace into basic (id,value,sensors1,sensors2) VALUES (1, 'is id 1', 19, 20);",
            "insert or replace into basic (id,value,sensors1,sensors2) VALUES (2, 'is id 2', 20, 21);"
        ],
        "query_table":"select * from basic;",
        "rest_url": "/id/:id",
        "rest_post_url": "/",
        "rest_port": 8848
    }

接着运行

    node index.js

##Test

###Firefox
    
1. 安装copper插件
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


## Liscense

© 2014 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license.

[iot]: https://github.com/gmszone/iot
[basic]: http://www.phodal.com/blog/use-constrained-application-protocol-in-internet-of-things/
[hello]: http://www.phodal.com/blog/use-node-coap-create-a-coap-server/
[returnjson]: http://www.phodal.com/blog/use-coap-build-internet-of-things-return-json/
[querydb]: http://www.phodal.com/blog/use-node-coap-sqlite-create-a-coap-server-get-response/
[db]: http://www.phodal.com/blog/use-coap-nodejs-sqlite-build-iot/
[returnxml]: http://www.phodal.com/blog/use-jstoxml-convert-iot-coap-return-json/
[iotblock]: http://www.phodal.com/blog/use-coap-block-send-data-on-iot-coap/
