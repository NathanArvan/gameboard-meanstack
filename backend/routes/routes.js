const express = require("express")
const Board = require('../models/Board')
const router = express.Router()

router.get('/boards', async (req, res) => {
    console.log('hit route')
    const boards = await Board.find();
    console.log(boards);
    res.send(boards)
})

router.post('/boards', async (req, res) => {
    const board = new Board({
        xDimension: req.body.xDimension,
        yDimension: req.body.yDimension,
    })
    await board.save();
    res.send(board);
})

module.exports = router