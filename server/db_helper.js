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
		db.run( 'create table if not exists ' + config["data_tbl_name"] + '(' + config["data_tbl_create_sql"] + ');' );
		db.run( 'create table if not exists ' + config["id_tbl_name"] + '(' + config["id_tbl_create_sql"] + ');' );

		date = new Date();
		db.run('insert or replace into ' + config["data_tbl_name"] + ' (id, sensor, ts, val) VALUES ($id, $sensor, $ts, $val)', {
			$id: 1,
			$sensor: 1,
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

db_helper.post_id = function( req, callback )
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

db_helper.put_id = function( req, callback )
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

db_helper.get_id = function( req, callback )
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

db_helper.del_id = function( req, callback )
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

db_helper.syncData = function( block, callback )
{
	console.log( block );
	var db = new sqlite3.Database( config["db_name"] );


	var str				   = generateDBKey( config["key"] );
	var string			   = generateDBKey( block );
	var insert_db_string   = "insert or replace into " + config["data_tbl_name"] + " (" + str + ") VALUES (" + string + ");";
	console.log( insert_db_string );
	db.all( insert_db_string, function( err )
			{
				db.close( );
			} );
	callback( );
};

db_helper.deleteData = function( url, callback )
{
	var db = new sqlite3.Database( config["db_name"] );

	console.log( "DELETE * FROM	" + config["data_tbl_name"] + "  where " + url.split( '/' )[1] + "=" + url.split( '/' )[2] );
	var insert_db_string = "DELETE * FROM  " + config["data_tbl_name"] + "  where " + url.split( '/' )[1] + "=" + url.split( '/' )[2];
	console.log( insert_db_string );
	db.all( insert_db_string, function( err )
			{
				db.close( );
			} );
	callback( );
};

db_helper.urlQueryData = function( url, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "SELECT * FROM " + config["data_tbl_name"] + " where id=" + url.split( '/' )[3] + " and sensor=" + url.split( '/' )[5];

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
	} );
};

module.exports = db_helper;
