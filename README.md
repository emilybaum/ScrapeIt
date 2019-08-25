# ScrapeIt
A web app that lets users view, add, and remove notes on the latest articles scraped from BuzzFeedNews. This app made possible thought the use of Mongoose and Cheerio.

[Hosted on Heroku](https://mighty-harbor-54900.herokuapp.com)

## Instructions
1. Start by clicking **Show Articles**
1. If you want to update the article list with new articles click **New Scrape** (this will replace all articles)
1. Add notes to any article and see other notes that have already been left
1. And you can always view the original source of the article

---

## What I learned
* When scraping another site, it's possible that the website has changed it's code so you need to pick some resillient classes to simplify the process. I went with the **.find()** method to look for matching classes and then extracted that content
* Mongoose is very powerful, but setting this up properly is key
* Articles that are scraped are stored as Objects with an associated Notes array. Working with this set up (an array or objects //_Articles_// a nexted array of objects //_Notes_//) caused some challenges with the Handlebars input initially, but ended up working through that and adding some if statement logic too

## Tech Used
`Mongoose`
`JavaScript`
`jQuery`
`Express`
`Express-handlebars`
`Handlebars`
`Cheerio`
`Axios`
`HTML`
`CSS`



