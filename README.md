
[![Build Status](https://api.travis-ci.org/gmszone/iot-coap.png)](https://travis-ci.org/gmszone/iot-coap)

#物联网系统 CoAP版

这是一个开源的最小物联网系统的CoAP版，如果你还是一个初学者建议用HTTP版 [https://github.com/gmszone/iot][iot]

##依赖库

 - RESTify
 - Node-CoAP
 - Node Sqlite3

##install

需要安装有Sqlite3及Nodejs


###安装node依赖

     npm install

###运行

     node server.js

###Test

    coap coap://localhost

##文档

[CoAP与物联网系统][basic]

[物联网系统与CoAP之Hello,World][hello]

## Liscense

© 2014 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license.

[iot]: https://github.com/gmszone/iot
[basic]: http://www.phodal.com/blog/use-constrained-application-protocol-in-internet-of-things/
[hello]: http://www.phodal.com/blog/use-node-coap-create-a-coap-server/

####IOT-MQTT#####

1.安装依赖库

    npm install mqtt
    npm install mosca bunyan -g

2.启动mosca

    mosca -v | bunyan

3.测试mqtt-client

    node mqtt-client.js
