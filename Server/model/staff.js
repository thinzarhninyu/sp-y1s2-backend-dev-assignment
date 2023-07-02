// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const db = require('./databaseConfig')
var config = require('../config.js');
var jwt = require('jsonwebtoken');
const Connection = require("mysql/lib/Connection");

var staffDB = {

    // get staff by staff_id
    getAdmin: function (staff_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM staff WHERE staff_id = ?';
                conn.query(sql, [staff_id], function (err, result) {
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

    // update staff by staff_id
    updateAdmin: function (email, password, username, staff_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE staff SET email=COALESCE(?,email), password=COALESCE(?, password), username=COALESCE(?, username) WHERE staff_id=?';
                conn.query(sql, [email, password, username,staff_id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // add staff
    addStaff: function (address, address2, district, city, postal_code, phone, first_name, last_name, email, store_id, username, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES(?,?,?,(select city_id from city where city=?),?,?);'
                conn.query(sql, [address, address2, district, city, postal_code, phone], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    var sql = 'INSERT INTO staff(first_name, last_name, address_id, email, store_id,  username, password) VALUES (?,?,(SELECT address_id FROM address ORDER BY last_update DESC LIMIT 1),?,?,?,?)';
                    conn.query(sql, [first_name, last_name, email, store_id, username, password], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);
                        }
                        else {
                            return callback(null, result);

                        }

                    });
                })
            }
        });
    },

    // log in to admin
    loginStaff: function (email, password, callback) {

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select * from staff where email=? and password=?';

                conn.query(sql, [email, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log("Err: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {

                            token = jwt.sign({ id: result[0].staff_id }, config.key, {
                                expiresIn: 86400 //expires in 24 hrs
                            });
                            console.log("@@token " + token);
                            return callback(null, token, result);


                        } else {
                            var err2 = new Error("Email/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }  //else
                });
            }
        });
    },
}

module.exports = staffDB;