const mongoose = require("mongoose")

const schema = mongoose.Schema({
	xDimension: Number,
	yDimension: Number,
})

module.exports = mongoose.model("Board", schema)