/**
 * Created by quanpower on 14-8-16.
 */

var mqtt = require('mqtt');
var sleep = require('sleep');

client = mqtt.createClient(1883, 'localhost');

client.publish('presence', 'Hello,i am quanpower!');
sleep.sleep(1);
client.publish('presence', 'Current time is:' + new Date());
sleep.sleep(1);
client.publish('presence', 'This\'s a demo!');
sleep.sleep(1);
client.publish('presence', 'Thank you!');
sleep.sleep(1);

client.end();
