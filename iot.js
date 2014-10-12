exports.config  = {
    "db_name": "iot.db",
    "mongodb_name": "iot",
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