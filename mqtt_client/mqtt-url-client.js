/**
 * Created by quanpower on 14-8-18.
 */

var mqtt = require('mqtt')
    , client = mqtt.connect('mqtt://user:pass@localhost?clientId=123abc');

client.subscribe('messages');
client.publish('messages', 'hello me!');
client.on('message', function(topic, message) {
    console.log(message);
});