const mongoose = require("mongoose")

const schema = mongoose.Schema({
	xDimension: Number,
	yDimension: Number,
	name: String,
})

module.exports = mongoose.model("Board", schema)