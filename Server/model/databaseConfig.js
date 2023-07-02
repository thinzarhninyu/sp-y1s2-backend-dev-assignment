// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

var mysql=require('mysql');

var dbConnect={

    getConnection:function(){
        var conn=mysql.createConnection({
            host:"localhost",
            user:"bed_dvd_root",
            password:"pa$$woRD123",
            database:"bed_dvd_db",
            dateStrings: true,
        }

        );

        return conn;

    }
}
module.exports=dbConnect;