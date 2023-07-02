// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

var express = require('express');
var app = express();
var actor = require('../model/actor.js');
var film = require('../model/film.js');
var staff = require('../model/staff.js');
var category = require('../model/category.js');

var customer = require('../model/customer.js');

var store = require('../model/store.js');

const jwt = require("jsonwebtoken");
const config = require("../config.js");
const verifyToken = require("../auth/verifyToken.js");

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const cors = require("cors");
const { verify } = require('crypto');
app.use(cors());

app.use(bodyParser.json());
app.use(urlencodedParser);



// get actor by actor_id - extra1
app.get('/actors/:actor_id', function (req, res) {
    var actorid = req.params.actor_id;
    actor.getActor(actorid, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result[0]);
        }
    });
});

// get all category - basic1
app.get('/category/', (req, res, next) => {
    category.getAllCategory((err, result) => {

        if (err) {
            res.status(500).send();
            console.log(err);
        }
        res.status(200).send(result);
    });
});

// get all language - extra2
app.get('/language/', (req, res, next) => {
    film.getAllLanguage((err, result) => {

        if (err) {
            res.status(500).send();
            console.log(err);
        }
        res.status(200).send(result);
    });
});

// get all store address - basic2
app.get('/address/', (req, res, next) => {
    store.getAllStoreAddress((err, result) => {

        if (err) {
            res.status(500).send();
            console.log(err);
        }
        res.status(200).send(result);
    });
});

// get customer by customer_id - extra3
app.get('/customers/:customer_id', function (req, res) {
    var customer_id = req.params.customer_id;
    customer.getCustomer(customer_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result[0]);
        }
    });
});

// get staff by staff_id - extra4
app.get('/admins/:staff_id', function (req, res) {
    var staff_id = req.params.staff_id;
    staff.getAdmin(staff_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result[0]);
        }
    });
});

// get film ratings by film_id - advanced1
app.get('/films/:film_id/ratings', function (req, res) {
    var film_id = req.params.film_id;
    film.getRating(film_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result);
        }
    });
});

// add rating for film with film_id - advanced2
app.post('/films/:film_id/rating', function (req, res) {

    var film_id = parseInt(req.params.film_id);
    var rating = req.body.rating;
    var comment = req.body.comment;

    film.addRating(film_id, rating, comment, function (err, result) {
        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
        } else {
            res.status(201).send({ rating_id: String(result.insertId) });
        }
    });
});

// add actor - basic3
app.post('/actors', verifyToken, function (req, res) {

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    if (first_name == undefined || last_name == undefined || first_name.length == 0 || last_name.length == 0) {
        return res.status(400).send({ "error_msg": "missing data" });
    }

    else {
        actor.addActor(first_name.toUpperCase(), last_name.toUpperCase(), function (err, result) {
            if (err) {
                res.status(500).send({ "error_msg": "Internal server error" });
            } else {
                res.status(201).send({ actor_id: String(result.insertId) });
            }
        });
    }
});

// edit actor with actor_id - extra5
app.put('/actors/:actor_id/update', verifyToken, function (req, res) {
    var actor_id = req.params.actor_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    if (first_name == null && last_name == null) {
        return res.status(400).send({ "error_msg": "missing data" });
    }

    actor.updateActor(first_name, last_name, actor_id, function (err, result) {
        if (result.affectedRows == 0) {

            res.send(204);
        }
        else if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send({ "success_msg": "record updated" });
        }
        console.log(result);
    });
});

// edit staff with staff_id - extra6
app.put('/admins/:staff_id/update', verifyToken, function (req, res) {
    var staff_id = req.params.staff_id;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    if (email == null && password == null) {
        return res.status(400).send({ "error_msg": "missing data" });
    }

    staff.updateAdmin(email, password, username, staff_id, function (err, result) {
        if (result.affectedRows == 0) {

            res.send(204);
        }
        else if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send({ "success_msg": "record updated" });
        }
        console.log(result);
    });
});

// edit dvd with film_id - extra7
app.put('/dvds/:film_id/update', verifyToken, function (req, res) {
    var film_id = req.params.film_id;
    var rental_duration = req.body.rental_duration;
    var rental_rate = req.body.rental_rate;
    var length = req.body.length;
    var replacement_cost = req.body.replacement_cost;
    var rating = req.body.rating;

    if (rental_duration == null && rental_rate == null && length == null && replacement_cost == null && rating == null) {
        return res.status(400).send({ "error_msg": "missing data" });
    }

    film.updateFilm(rental_duration, rental_rate, length, replacement_cost, rating, film_id, function (err, result) {
        if (err) {
            if (err.code = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
                res.status(204).send({ " error_msg": "NaN" })
                console.log(err)
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
                console.log(err);
            }
        }

        else {
            res.status(200).send({ "success_msg": "record updated" });
        }
        console.log(result);
    });
});

// edit customer with customer_id - extra8
app.put('/customers/:customer_id/update', verifyToken, function (req, res) {
    var customer_id = req.params.customer_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    if (first_name == null && last_name == null && email == null) {
        return res.status(400).send({ "error_msg": "missing data" });
    }

    customer.updateCustomer(first_name, last_name, email, customer_id, function (err, result) {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ "error_msg": "email already exist" });
            }
            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
            }
        }

        else {
            res.status(200).send({ "success_msg": "record updated" });
        }
        console.log(result);
    });
});

// delete actor with actor_id - extra9
app.delete('/actors/:actor_id', verifyToken, function (req, res) {
    var actorid = req.params.actor_id;
    actor.deleteActor(actorid, actorid, function (err, result) {
        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.affectedRows == 0) {

            res.send(204);
        }
        else if (result) {
            console.log(result.affectedRows)
            console.log(result)
            res.status(200).send({ "success_msg": "actor deleted" });
        }
    });
});


// delete customer with customer_id - extra10
app.delete('/customers/:customer_id', verifyToken, function (req, res) {
    var customer_id = req.params.customer_id;
    customer.deleteCustomer(customer_id, customer_id, customer_id, function (err, result) {
        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.affectedRows == 0) {

            res.send(204);
        }
        else if (result) {
            console.log(result.affectedRows)
            console.log(result)
            res.status(200).send({ "success_msg": "customer deleted" });
        }
    });
});

// delete dvd with film_id - extra11
app.delete('/dvds/:dvdID', verifyToken, function (req, res) {
    var dvdID = req.params.dvdID;
    film.deleteFilm(dvdID, dvdID, dvdID, dvdID, function (err, result) {
        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.affectedRows == 0) {

            res.send(204);
        }
        else if (result) {
            console.log(result.affectedRows)
            console.log(result)
            res.status(200).send({ "success_msg": "DVD deleted" });
        }
    });
});


// get all films - extra12
app.get('/films', function (req, res) {
    film.getAllFilms(function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.send(result);
        }
    });
});

// get all film categories - basic4
app.get('/film_categories/:category_id', function (req, res) {
    var category_id = req.params.category_id;
    film.getFilmCategory(category_id, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }

        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});

// add customer - extra13
app.post('/customers', verifyToken, function (req, res, next) {
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
    var district = req.body.district;
    var city = req.body.city;
    var postal_code = req.body.postal_code;
    var phone = req.body.phone;
    var store_id = req.body.store_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;

    var address = req.body.address;
    customer.addCustomer(address_line1, address_line2, district, city, postal_code, phone, store_id, first_name, last_name, email, password, function (err, result) {
        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                res.status(409).send({ "error_msg": "email already exist" });
            }
            else if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
            }

        }
        else {
            res.status(201).send({ customer_id: result.insertId });
        }
    });
});

// add staff - extra14
app.post('/staff', verifyToken, function (req, res, next) {
    var store_id = req.body.store_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var address = req.body.address;
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
    var district = req.body.district;
    var city = req.body.city;
    var postal_code = req.body.postal_code;
    var phone = req.body.phone;

    staff.addStaff(address_line1, address_line2, district, city, postal_code, phone, first_name, last_name, email, store_id, username, password, function (err, result) {
        if (err) {

            if (err.code == "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
            }

        }
        else {
            res.status(201).send({ staff_id: result.insertId });
        }
    });
});

// add films - extra15
app.post('/films', verifyToken, function (req, res, next) {
    var title = req.body.title;
    var description = req.body.description;
    var release_year = req.body.release_year;
    var language = req.body.language;
    var rental_duration = req.body.rental_duration;
    var rental_rate = req.body.rental_rate;
    var length = req.body.length;
    var replacement_cost = req.body.replacement_cost;
    var rating = req.body.rating;
    var special_features = req.body.special_features;

    film.addFilm(title, description, release_year, language, rental_duration, rental_rate, length, replacement_cost, rating, special_features, function (err, result) {
        if (err) {

            if (err.code = "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
                res.status(204).send({ " error_msg": "NaN" })
                console.log(err)
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
                console.log(err);
            }

        }
        else {
            res.status(201).send({ film_id: result.insertId });
        }
    });

});

// edit customer address with customer_id - extra16
app.put('/customers/:customer_id/address', function (req, res) {
    var customer_id = req.params.customer_id;
    var address_line1 = req.body.address_line1;
    var address_line2 = req.body.address_line2;
    var district = req.body.district;
    var city = req.body.city;
    var postal_code = req.body.postal_code;
    var phone = req.body.phone;

    customer.updateCustomerAddress(customer_id, address_line1, address_line2, district, city, postal_code, phone, function (err, result) {
        if (err) {
            if (err.sqlMessage === "Column 'city_id' cannot be null") {
                res.status(400).send({ "error_msg": "invalid city" });
            }
            else if (err.code === "ER_BAD_NULL_ERROR") {
                res.status(400).send({ "error_msg": "missing data" });
            }
            else {
                res.status(500).send({ "error_msg": "Internal server error" });
            }
            console.log(err);
        }
        else if (result.affectedRows == 0) {
            res.send(204);

        }
        else {
            res.status(200).send({ "success_msg": "record updated" });
        }
    });
});

// log in to admin - basic5
app.post('/staff/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    staff.loginStaff(email, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
        } else {
            res.status(500);
            res.send(err.statusCode);
        }
    });
});


// get film with film_id - basic6
app.get('/dvds/:dvdID', function (req, res) {
    var id = req.params.dvdID;
    film.getFilm(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Film Found");
            } else {
                res.send(result[0]);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});

// get film with film_id for admin - extra17
app.get('/dvds/:dvdID/admin', function (req, res) {
    var id = req.params.dvdID;
    film.getFilm(id, function (err, result) {


        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.send(result[0]);
        }
    });

});

// get actors of film using film_id - basic7
app.get('/dvds/:dvdID/actors', function (req, res) {
    var id = req.params.dvdID;
    film.getActorByFilm(id, function (err, result) {
        if (!err) {
            if (result.length == 0) {
                res.status(404).send("No Film Found");
            } else {
                res.send(result);
            }
        } else {
            res.status(500).send("Some error");
        }
    });

});

// search for films - basic8 (modified)
app.get('/search', function (req, res) {
    var category_id = req.query.category_id;
    var title = req.query.title;
    var maxprice = req.query.maxprice;

    film.search(title, category_id, maxprice, function (err, result) {

        if (err) {
            res.status(500).send({ "error_msg": "Internal server error" });
            console.log(err);
        }
        else if (result.length == 0) {
            res.send(204);
        }
        else {
            res.status(200).send(result);
            console.log(result.length)

        }
    });
});

// log in to customer - extra18
app.post('/customer/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    customer.loginCustomer(email, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            console.log(result);
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!', loggedInID: result[0].customer_id });
            // res.send();
        } else {
            res.status(500);
            res.send(err.statusCode);
        }
    });
});

module.exports = app