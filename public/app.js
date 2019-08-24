// add the document selectors and logic for display on DOM
$(document).ready(function() {
    const $scrapeIt = $("#scrapeIt");
    const $openSavedNotes = $(".openNotes")
    const $openNewNotes = $(".newNotes")

    function handleScrape() {

        return $.ajax({
            type: "GET",
            url: "/scrapeit",
        }).then(function(data) {
            console.log(data)
            alert('Great! The scrape is complete, now click on "Show articles"')
        })
    }
    


    function openNoteModal() {
        let id = $(this).attr("article-id")

        return $.ajax({
            type: "GET",
            url: "/notes/" + id,
            id: id
        }).then(function (data) {
            console.log(data)
            // let noteTitle = $("#noteTitle");
            let noteBody = $("#noteBody");
            let dbNote = data.note // this is an array
            // data.note._id -- this needs to pass to the individual element
            let articleId = data._id // this is the article id
            console.log(articleId)

            noteBody.setAttribute("article-id", articleId)
            noteBody.write(dbNote)

        })
    }
    


    function newNoteModal() {
        let id = $(this).attr("article-id")
        $("#saveNewNote").on("click", getNoteInput(id))
        
    }

    function getNoteInput(id) {
        let input = $("#exampleFormControlTextarea1").value().trim()
        return $.ajax({
            type: "POST",
            url: "/notes/" + id,
            id: id,
            input: input
        }).then(function (data) {
            console.log(data)
            alert("your note has been added")
        })
    }


    $scrapeIt.on("click", handleScrape);
    $openSavedNotes.on("click", openNoteModal);
    $openNewNotes.on("click", newNoteModal)


}) // end document.ready