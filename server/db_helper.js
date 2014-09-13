const sqlite3	= require( 'sqlite3' ).verbose( )
const fs		= require( "fs" )
const _			= require( "underscore" )
const config	= require( "../index" ).config;

function db_helper( )
{
}

db_helper.initDB = function( )
{
	var db = new sqlite3.Database( config["db_name"] );

	db.serialize( function( ) {
		db.run( 'create table if not exists ' + config["dp_tbl_name"] + '(' + config["dp_tbl_create_sql"] + ');' );
		db.run( 'create table if not exists ' + config["id_tbl_name"] + '(' + config["id_tbl_create_sql"] + ');' );
		db.run( 'create table if not exists ' + config["ch_tbl_name"] + '(' + config["ch_tbl_create_sql"] + ');' );

		date = new Date();
		db.run('insert or replace into ' + config["dp_tbl_name"] + ' (id, ch, ts, val) VALUES ($id, $ch, $ts, $val)', {
			$id: 1,
			$ch: 1,
			$ts: date.toISOString(),
			$val: '25.6'
		});
	} );
	db.close( );
};

function blockToJson( block )
{
	var result = {};

	if( !_.isEmpty( block ) )
	{
		var str = "";
		str += "{";
		_.each( block, function( array, index )
				{
					str += '"' + config["key"][index] + '"' + ':"' + array + '",';
				} );
		str	   = str.substring( 0, str.length - 1 );
		str	  += "}";
		result = JSON.parse( str );
	}
	return result;
}

function generateDBKey( this_block )
{
	var str = "";
	_.each( this_block, function( key )
			{
				str += key + ",";
			} );
	str = str.substring( 0, str.length - 1 );
	return str;
}

db_helper.post_device = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('insert into ' + config["id_tbl_name"] +
			' (id, name, desc, local, latitude, longitude) VALUES ($id, $name, $desc, $local, $latitude, $longitude)', {
			$id: req.url.split( '/' )[3],
			$name: jsonText.name,
			$desc: jsonText.desc,
			$local: jsonText.local,
			$latitude: parseFloat(jsonText.latitude),
			$longitude: parseFloat(jsonText.longitude)
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.put_device = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('replace into ' + config["id_tbl_name"] +
			' (id, name, desc, local, latitude, longitude) VALUES ($id, $name, $desc, $local, $latitude, $longitude)', {
			$id: req.url.split( '/' )[3],
			$name: jsonText.name,
			$desc: jsonText.desc,
			$local: jsonText.local,
			$latitude: parseFloat(jsonText.latitude),
			$longitude: parseFloat(jsonText.longitude)
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.get_device = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "select * from " + config["id_tbl_name"] + " where id=" + req.url.split( '/' )[3];

	db.all (sql, function(err, rows) {
		db.close();
		try {
			jsonText = JSON.stringify(rows);

			callback(jsonText);
		}
		catch( e ) {
			callback( err );
		}
	} );
};

db_helper.del_device = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "delete from " + config["id_tbl_name"] + " where id=" + req.url.split( '/' )[3];

	db.all (sql, function(err, rows) {
		db.close();
		try {
			callback('ok');
		}
		catch( e ) {
			callback( err );
		}
	} );
};

db_helper.post_channel = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('insert into ' + config["ch_tbl_name"] +
			' (id, ch, type, name, desc, unit) VALUES ($id, $ch, $type, $name, $desc, $unit)', {
			$id: req.url.split( '/' )[3],
			$ch: req.url.split( '/' )[5],
			$type: jsonText.type,
			$name: jsonText.name,
			$desc: jsonText.desc,
			$unit: jsonText.unit,
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.put_channel = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('replace into ' + config["ch_tbl_name"] +
			' (id, ch, type, name, desc, unit) VALUES ($id, $ch, $type, $name, $desc, $unit)', {
			$id: req.url.split( '/' )[3],
			$ch: req.url.split( '/' )[5],
			$type: jsonText.type,
			$name: jsonText.name,
			$desc: jsonText.desc,
			$unit: jsonText.unit,
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.get_channel = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "select * from "
		+ config["ch_tbl_name"]
		+ " where id=" + req.url.split( '/' )[3]
		+ " and ch=" + req.url.split( '/' )[5];;

	db.all (sql, function(err, rows) {
		db.close();
		try {
			jsonText = JSON.stringify(rows);

			callback(jsonText);
		}
		catch( e ) {
			callback( err );
		}
	} );
};

db_helper.del_channel = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "delete from "
		+ config["ch_tbl_name"]
		+ " where id=" + req.url.split( '/' )[3]
		+ " and ch=" + req.url.split( '/' )[5];

	db.all (sql, function(err, rows) {
		db.close();
		try {
			callback('ok');
		}
		catch( e ) {
			callback( err );
		}
	} );
};

db_helper.post_datapoint = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('insert or replace into ' + config["dp_tbl_name"] +
			' (id, ch, ts, val) VALUES ($id, $ch, $ts, $val)', {
			$id: req.url.split( '/' )[3],
			$ch: req.url.split( '/' )[5],
			$ts: req.url.split( '/' )[7],
			$val: jsonText.val,
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.put_datapoint = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	try {
		var jsonText = JSON.parse(req.body);
		db.run('replace into ' + config["dp_tbl_name"]
			+ ' (id, ch, ts, val) VALUES ($id, $ch, $ts, $val)', {
			$id: req.url.split( '/' )[3],
			$ch: req.url.split( '/' )[5],
			$ts: req.url.split( '/' )[7],
			$val: jsonText.val,
		});

		callback('ok');
	}
	catch (e) {
		callback(e);
	}

	db.close( );
};

db_helper.get_datapoint = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "SELECT * FROM " + config["dp_tbl_name"]
		+ " where id=" + req.url.split( '/' )[3]
		+ " and ch=" + req.url.split( '/' )[5]
		+ " and ts='" + req.url.split( '/' )[7] + "'";

	db.get (sql, function(err, rows) {
		db.close( );
		try {
			var memberfilter = new Array();
			memberfilter[0] = "ts";
			memberfilter[1] = "val";
			jsonText = JSON.stringify(rows, memberfilter);

			callback(jsonText);
		}
		catch( e ) {
			callback( err );
		}
	});
};

db_helper.del_datapoint = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "delete from " + config["dp_tbl_name"]
		+ " where id=" + req.url.split( '/' )[3]
		+ " and ch=" + req.url.split( '/' )[5]
		+ " and ts='" + req.url.split( '/' )[7] + "'";

	db.run( sql, function( err ) {
		db.close( );
		callback( err );
	} );
};

db_helper.get_datapoints = function( req, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "SELECT * FROM " + config["dp_tbl_name"]
		+ " where id=" + req.url.split( '/' )[3]
		+ " and ch=" + req.url.split( '/' )[5];

	db.all (sql, function(err, rows) {
		db.close( );
		try {
			var memberfilter = new Array();
			memberfilter[0] = "ts";
			memberfilter[1] = "val";
			jsonText = JSON.stringify(rows, memberfilter);

			callback(jsonText);
		}
		catch( e ) {
			callback( err );
		}
	});
};

module.exports = db_helper;
