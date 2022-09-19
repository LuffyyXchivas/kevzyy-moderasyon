const { Schema, model } = require("mongoose");

const schema = Schema({

	guildID: { type: String, default: "" },

        tagMode: Boolean,
});

module.exports = model("tagmod", schema);