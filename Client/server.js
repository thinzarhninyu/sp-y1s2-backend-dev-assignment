// THINZAR HNIN YU
// DIT/FT/1B/03
// P2201014

const express = require("express");
const app = express();
const path=require("path");
app.use("/static",express.static("public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
  });

  app.get("/home", (req, res) => {
    res.sendFile("/public/index.html", { root: __dirname });
  });

  app.get("/cart/", (req, res) => {
    res.sendFile("/public/cart.html", { root: __dirname });
  });
  app.get("/dvds/:id", (req, res) => {
    res.sendFile("/public/dvdDetails.html", { root: __dirname });
  });
  
  app.get("/search", (req, res) => {
    res.sendFile("/public/dvds.html", { root: __dirname });
  });
  

  app.get("/newActor/", (req, res) => {
    res.sendFile("/public/addActor.html", { root: __dirname });
  });  
  
  app.get("/newCustomer/", (req, res) => {
    res.sendFile("/public/addCustomer.html", { root: __dirname });
  });

  

  app.get("/newAdmin/", (req, res) => {
    res.sendFile("/public/addAdmin.html", { root: __dirname });
  });


  app.get("/newFilm/", (req, res) => {
    res.sendFile("/public/addFilm.html", { root: __dirname });
  });
  
  app.get("/adminLogIn/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
  });

  app.get("/editActor/", (req, res) => {
    res.sendFile("/public/editActor.html", { root: __dirname });
  });

  app.get("/editCustomer/", (req, res) => {
    res.sendFile("/public/editCustomer.html", { root: __dirname });
  });

  app.get("/searchActor/", (req, res) => {
    res.sendFile("/public/searchActor.html", { root: __dirname });
  });

  app.get("/searchAdmin/", (req, res) => {
    res.sendFile("/public/searchAdmin.html", { root: __dirname });
  });

  app.get("/deleteActor/", (req, res) => {
    res.sendFile("/public/deleteActor.html", { root: __dirname });
  });

  app.get("/searchCustomer/", (req, res) => {
    res.sendFile("/public/searchCustomer.html", { root: __dirname });
  });
  app.get("/searchFilm/", (req, res) => {
    res.sendFile("/public/searchFilm.html", { root: __dirname });
  });

  app.get("/customerReview/:film_id", (req, res) => {
    res.sendFile("/public/rating.html", { root: __dirname });
  });

  app.get("/actors/:actor_id", (req, res) => {
    res.sendFile("/public/actorDetails.html", { root: __dirname });
  });

  app.get("/customers/:customer_id", (req, res) => {
    res.sendFile("/public/customerDetails.html", { root: __dirname });
  });

  app.get("/dvds/:dvdID/admin", (req, res) => {
    res.sendFile("/public/filmDetails.html", { root: __dirname });
  });

  app.get("/actors/:actor_id/update", (req, res) => {
    res.sendFile("/public/editActor.html", { root: __dirname });
  });

  app.get("/admins/:staff_id/update", (req, res) => {
    res.sendFile("/public/editAdmin.html", { root: __dirname });
  });


  app.get("/customers/:customer_id/update", (req, res) => {
    res.sendFile("/public/editCustomer.html", { root: __dirname });
  });

  app.get("/dvds/:film_id/update", (req, res) => {
    res.sendFile("/public/editFilm.html", { root: __dirname });
  });


  app.get("/adminHome/", (req, res) => {
    res.sendFile("/public/adminHome.html", { root: __dirname });
  });

  app.get("/cartHome/", (req, res) => {
    res.sendFile("/public/cartHome.html", { root: __dirname });
  });

const PORT=8082



app.listen(PORT, () => {
    console.log(`Client server has started listening on port ${PORT}`);
  });