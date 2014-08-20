/**
 * Created by quanpower on 14-8-15.
 */
var mqtt = require('mqtt')

client = mqtt.createClient(1883, 'localhost');

client.subscribe('presence');
client.publish('presence', 'Hello mqtt');

client.on('message', function (topic, message) {
    console.log(message);
});

client.end();
