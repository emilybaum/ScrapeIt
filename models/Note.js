// Notes model

const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
    submitter: String,
    body: String
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;