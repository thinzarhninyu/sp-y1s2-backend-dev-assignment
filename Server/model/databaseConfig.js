// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

require('dotenv').config();
var mysql=require('mysql2');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME,
            dateStrings: true,
        }

        );

        return conn;

    }
}
module.exports=dbConnect;