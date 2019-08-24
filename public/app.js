// add the document selectors and logic for display on DOM
$(document).ready(function() {
    const $scrapeIt = $("#scrapeIt");

    function handleScrape() {
        return $.ajax({
            type: "GET",
            url: "/scrapeit",
        }).then(function(data) {
            console.log(data)
        })
    }

    $scrapeIt.on("click", handleScrape);

}) // end document.ready