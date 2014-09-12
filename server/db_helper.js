const sqlite3	= require( 'sqlite3' ).verbose( )
const fs		= require( "fs" )
const _			= require( "underscore" )
const config	= require( "../index" ).config;

function DBHelper( )
{
}

DBHelper.initDB = function( )
{
	var db = new sqlite3.Database( config["db_name"] );

	var create_table = 'create table if not exists ' + config["table_name"] + '(' + config["db_table"] + ');';

	db.serialize( function( ) {
		db.run( create_table );
		date = new Date();
		db.run("insert or replace into basic (id, sensor, ts, val) VALUES ($id, $sensor, $ts, $val)", {
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

DBHelper.syncData = function( block, callback )
{
	console.log( block );
	var db = new sqlite3.Database( config["db_name"] );


	var str				   = generateDBKey( config["key"] );
	var string			   = generateDBKey( block );
	var insert_db_string   = "insert or replace into " + config["table_name"] + " (" + str + ") VALUES (" + string + ");";
	console.log( insert_db_string );
	db.all( insert_db_string, function( err )
			{
				db.close( );
			} );
	callback( );
};

DBHelper.deleteData = function( url, callback )
{
	var db = new sqlite3.Database( config["db_name"] );


	console.log( "DELETE * FROM	" + config["table_name"] + "  where " + url.split( '/' )[1] + "=" + url.split( '/' )[2] );
	var insert_db_string = "DELETE * FROM  " + config["table_name"] + "  where " + url.split( '/' )[1] + "=" + url.split( '/' )[2];
	console.log( insert_db_string );
	db.all( insert_db_string, function( err )
			{
				db.close( );
			} );
	callback( );
};

DBHelper.urlQueryData = function( url, callback )
{
	var db = new sqlite3.Database( config["db_name"] );
	var sql = "SELECT * FROM " + config["table_name"] + " where id=" + url.split( '/' )[3] + " and sensor=" + url.split( '/' )[5];

	db.all (sql, function(err, rows) {
		db.close( );
		try {
debugger;
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

module.exports = DBHelper;
