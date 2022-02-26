const express = require("express")
const Board = require('../models/Board')
const router = express.Router()

router.get('/boards', async (req, res) => {
    const boards = await Board.find();
    res.send(boards)
})

router.post('/boards', async (req, res) => {
    const board = new Board({
        xDimension: req.body.xDimension,
        yDimension: req.body.yDimension,
        name: req.body.name
    })
    await board.save();
    res.send(board);
})

router.get("/boards/:id", async (req, res) => {
    try {
        const board = await Board.findOne({ _id: req.params.id })
        res.send(board)
    }
	catch {
        res.status(404)
		res.send({ error: "Board doesn't exist!" })
    }
})

router.put("/boards/:id", async (req, res) => {
	try {
		const board = await Board.findOne({ _id: req.params.id })

		if (req.body.xDimension) {
			board.xDimension = req.body.xDimension
		}

		if (req.body.yDimension) {
			board.yDimension = req.body.yDimension
		}

        if (req.body.name) {
			board.name = req.body.name
		}

		await board.save()
		res.send(board)
	} catch {
		res.status(404)
		res.send({ error: "Board doesn't exist!" })
	}
})

router.delete("/boards/:id", async (req, res) => {
	try {
		await Board.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Board doesn't exist!" })
	}
})

module.exports = router