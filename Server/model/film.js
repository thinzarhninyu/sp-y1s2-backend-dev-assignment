// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const db = require('./databaseConfig')
var config = require('../config.js');
var jwt = require('jsonwebtoken');
const Connection = require("mysql/lib/Connection");

var filmDB = {

    // get all language
    getAllLanguage: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select * from language';
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

    // get rating for film using film_id
    getRating: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT rating, comment, film_id, rating_id FROM rating WHERE film_id = ?';
                conn.query(sql, [film_id], function (err, result) {
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

    // add rating to film using film_id
     addRating: function (film_id, rating, comment, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'Insert into rating (film_id, rating, comment) values(?,?,?)';
                conn.query(sql, [film_id, rating, comment], function (err, result) {
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

    // update film using film_id
    updateFilm: function (rental_duration, rental_rate, length, replacement_cost, rating, film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE film SET rental_duration=COALESCE(?,rental_duration), rental_rate=COALESCE(?, rental_rate), length=COALESCE(?,length), replacement_cost=COALESCE(?, replacement_cost), rating=COALESCE(?, rating) WHERE film_id=?';
                conn.query(sql, [rental_duration, rental_rate, length, replacement_cost, rating, film_id], function (err, result) {
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

    // delete film using film_id
    deleteFilm: function (dvdID, dvdID, dvdID, dvdID, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql5 = 'Delete from rating where film_id=?;';
                conn.query(sql5, [dvdID], function (err, result) {

                    if (err) {
                        console.log(err);
                        return callback(err, null);

                    }
                    var sql0 = 'Delete from rental where inventory_id IN (SELECT inventory_id from inventory where film_id=?);';
                    conn.query(sql0, [dvdID], function (err, result) {
                        if (err) {
                            console.log(err);
                            return callback(err, null);

                        }
                        var sql = 'Delete from inventory where film_id=?;';
                        conn.query(sql, [dvdID], function (err, result) {
                            if (err) {
                                console.log(err);
                                return callback(err, null);

                            }
                            var sql1 = 'Delete from film_category where film_id=?;';
                            conn.query(sql1, [dvdID], function (err, result) {
                                if (err) {
                                    console.log(err);
                                    return callback(err, null);

                                }
                                var sql2 = 'Delete from film_actor where film_id=?;';
                                conn.query(sql2, [dvdID], function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        return callback(err, null);

                                    }
                                    var sql3 = 'Delete from film_text where film_id=?;';
                                    conn.query(sql3, [dvdID], function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            return callback(err, null);

                                        }
                                        var sql4 = 'Delete from film where film_id=?;';
                                        conn.query(sql4, [dvdID], function (err, result) {
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
                            })
                        })
                    })
                })
            }
        });
    },

    // get films by film_id
    getFilmsByID: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
             
                console.log("Connected!");
                var sql = 'select f.*, c.name from film f, category c where film_id=?';
                conn.query(sql, [film_id], function (err, result) {
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

    // get all films
    getAllFilms: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT f.film_id, f.title, cat.name, f.description, f.rating, f.release_year, f.length FROM film f, film_category fcat, category cat WHERE (fcat.film_id = f.film_id) AND (fcat.category_id = cat.category_id)';
                conn.query(sql, function (err, result) {
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

    // get film category
    getFilmCategory: function (category_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT name from category where category_id=?';
                conn.query(sql, [category_id], function (err, result) {
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

    // add film
    addFilm: function (title, description, release_year, language, rental_duration, rental_rate, length, replacement_cost, rating, special_features, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES(?,?,?,?,?,?,?,?,?,?);';

                conn.query(sql, [title, description, release_year, language, rental_duration, rental_rate, length, replacement_cost, rating, special_features], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }

                    else {
                        return callback(null, result);
                    }

                })
            }
        });
    },

    // get film by film_id
    getFilm: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT f.*, cat.name FROM film f, film_category fcat, category cat WHERE (f.film_id = ?);';
                conn.query(sql, [film_id], function (err, result) {
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

    // get actor of film by film_id
    getActorByFilm: function (film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'select a.first_name, a.last_name from film_actor f, actor a where f.film_id=? and f.actor_id = a.actor_id;';
                conn.query(sql, [film_id], function (err, result) {
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

    // search film
    search: (title, category_id, maxprice, callback) => {
        var conn = db.getConnection();

        conn.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected");
                let sql = `SELECT f.title, f.description, f.release_year, f.rental_rate, f.length, f.rating, f.special_features, cat.name, f.film_id, l.name as language FROM film f, film_category fcat, category cat, language l
            WHERE f.film_id = fcat.film_id 
            AND fcat.category_id = cat.category_id
            AND f.language_id = l.language_id
            `;
                let queryInput = [];
                if (title != "" && title != undefined && title != "null") {
                    sql += ` AND f.title RLIKE ?`;
                    queryInput.push(title);


                }
                if (category_id != "" && category_id != undefined && category_id != "null" && category_id != 0) {
                    sql += ` AND fcat.category_id = ?`;
                    queryInput.push(category_id);

                }
                if (maxprice != "" && maxprice != undefined && maxprice != "null" && maxprice!=0) {
                    sql += ` AND f.rental_rate <= ?`;
                    queryInput.push(maxprice);
                }

                conn.query(sql, queryInput, (err, result) => {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    return callback(null, result);
                });
            }
        });
    },
}
module.exports = filmDB;