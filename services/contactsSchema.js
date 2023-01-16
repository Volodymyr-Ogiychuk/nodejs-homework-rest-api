const { Schema, model } = require("mongoose");

const contact = new Schema({
    name: {
        type: String,
        required: [true, "Set contact name"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const Contact = model("contact", contact);

module.exports = Contact;