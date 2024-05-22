// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const db = require('./databaseConfig')

var storeDB = {

    // get all store addresses
    getAllStoreAddress: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select a.*, c.city from address a, store s, city c where s.address_id = a.address_id and c.city_id = a.city_id';
                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
}
module.exports = storeDB;