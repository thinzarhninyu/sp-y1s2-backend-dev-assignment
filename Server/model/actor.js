// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const db = require('./databaseConfig')

var actorDB = {

    // get actor with actor_id
    getActor: function (actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT actor_id, first_name, last_name FROM actor WHERE actor_id = ?';
                conn.query(sql, [actor_id], function (err, result) {
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

    // get actors by limit
    getActorsByLimit: function (limit, offset, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT actor_id, first_name, last_name FROM actor ORDER BY first_name LIMIT ? OFFSET ?';
                conn.query(sql, [limit, offset], function (err, result) {
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

    // add actor
    addActor: function (first_name, last_name, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Insert into actor (first_name, last_name) values(?,?)';
                conn.query(sql, [first_name, last_name], function (err, result) {
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

    // update actor
    updateActor: function (first_name, last_name, actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE actor SET first_name=COALESCE(?,first_name), last_name=COALESCE(?, last_name) WHERE actor_id=?';
                conn.query(sql, [first_name, last_name, actor_id], function (err, result) {
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

    // delete actor
    deleteActor: function (actor_id, actor_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Delete from film_actor where actor_id=?;';
                conn.query(sql, [actor_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);

                    }
                    var sql2 = 'Delete from actor where actor_id=?;';
                    conn.query(sql2, [actor_id], function (err, result) {
                        conn.end();
                        if (err) {
                            console.log(err);
                            return callback(err, null);

                        } else {
                            return callback(null, result);
                        }
                    });
                })
            }
        });
    },

}

module.exports = actorDB;