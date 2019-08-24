const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function(app) {
    // app.get("/scrape", function (req, res) {
    //     db.Events.findAll({}).then(function (dbEvent) {
    //         res.json(dbEvent);
    //     });
    // });


    // A GET route for scraping the website
    app.get("/scrapeit", function (req, res) {
        axios.get("https://www.buzzfeednews.com/").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $(".newsblock-story-card").each(function (i, element) {
                // Save an empty result object
                let result = {};
                

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .find(".newsblock-story-card__title")
                    .text().trim();
                result.img = $(this)
                    .find(".img-wireframe__image")
                    .attr("src");
               
                result.description = $(this)
                    .find(".newsblock-story-card__description")
                    .text().trim();
                result.link = $(this)
                    .children("a")
                    .attr("href")


                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // console.log(dbArticle);
                       
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

           
            res.send("Scrape complete")
            console.log("Scrape Complete")
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        db.Article.find({}).sort({ '_id': -1 }).limit(24)
            .then(function (dbArticle) {

                let allArticles = {
                    articles: dbArticle
                }

                res.render("index", allArticles);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/notes/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.render("index", dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    app.get("/notes", function (req, res) {
        db.Article.find({})
            .populate("note")
            .then(function (dbArticle) {

                let allNotes = {
                    notes: dbArticle
                }

                res.render("notes", allNotes);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

}