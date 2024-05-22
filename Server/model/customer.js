// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const db = require('./databaseConfig')

var customerDB = {

    // get customer with customer_id
    getCustomer: function (customer_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT customer_id, first_name, last_name FROM customer WHERE customer_id = ?';
                conn.query(sql, [customer_id], function (err, result) {
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

    // update customer
    updateCustomer: function (first_name, last_name, email, customer_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE customer SET first_name=COALESCE(?,first_name), last_name=COALESCE(?, last_name), email=COALESCE(?, email) WHERE customer_id=?';
                conn.query(sql, [first_name, last_name, email, customer_id], function (err, result) {
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


    // delete customer
    deleteCustomer: function (customer_id, customer_id, customer_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Delete from rental where customer_id=?;';
                conn.query(sql, [customer_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);

                    }
                    var sql2 = 'Delete from payment where customer_id=?;';
                    conn.query(sql2, [customer_id], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);

                        }
                        var sql3 = 'Delete from customer where customer_id=?;';
                        conn.query(sql3, [customer_id], function (err, result) {
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
                })
            }
        });
    },

    // get customer payment by customer_id, state_date and end_date
    getCustomerPayment: function (customer_id, start_date, end_date, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = "SELECT f.title, p.amount, p.payment_date FROM payment p, rental r, inventory i, film f WHERE p.customer_id=? AND p.rental_id=r.rental_id AND r.inventory_id=i.inventory_id AND i.film_id=f.film_id AND p.payment_date BETWEEN ? AND ?";
                conn.query(sql, [customer_id, start_date, end_date], function (err, result) {
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

    // add customer
    addCustomer: function (address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES(?,?,?,(select city_id from city where city=?),?,?);';

                conn.query(sql, [address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    var sql2 = 'INSERT INTO customer(store_id, first_name, last_name, email, password, address_id) VALUES (?,?,?,?,?,(SELECT address_id FROM address ORDER BY last_update DESC LIMIT 1))';
                    conn.query(sql2, [store_id, first_name, last_name, email, password], function (err, result) {
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

    // update customer address
    updateCustomerAddress: function (customer_id, address_line1, address_line2, district, city, postal_code, phone, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE address inner join customer on customer.customer_id=? and address.address_id=customer.address_id SET address=?, address2=?, district=?, city_id=(select city_id from city where city=?), postal_code=?, phone=?;';
                conn.query(sql, [customer_id, address_line1, address_line2, district, city, postal_code, phone], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // log in to customer
    loginCustomer: function (email, password, callback) {

        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select * from customer where email=? and password=?';

                conn.query(sql, [email, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log("Err: " + err);
                        return callback(err, null, null);
                    } else {
                        var token = "";
                        var i;
                        if (result.length == 1) {

                            token = jwt.sign({ id: result[0].customer_id }, config.key, {
                                expiresIn: 86400 //expires in 24 hrs
                            });
                            console.log("@@token " + token);
                            return callback(null, token, result);


                        } else {
                            var err2 = new Error("Email/Password does not match.");
                            err2.statusCode = 500;
                            return callback(err2, null, null);
                        }
                    }  
                });
            }
        });
    },
}
module.exports = customerDB;