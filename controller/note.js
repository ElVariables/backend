const express = require('express');
const noteModel = require('../Schema/note');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const note = await noteModel.find();
        res.json({
            data: note,
        });
    } catch (error) {
        res.status(401).json({
            msg: error,
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await noteModel.findById(id);
        return res.json({
            data: note,
        });
    } catch (error) {
        res.status(401).json(error);
    }
});

router.post('/', async (req, res) => {
    const { task, title, desc } = req.body;
    if (!task || !title || !desc) {
        return res.json({
            msg: 'Missing fields',
        });
    }

    const newNote = new noteModel({
        task,
        title,
        desc,
    });

    const note = await newNote.save();
    res.status(201).json({
        data: note,
        msg: 'Successfully',
    });
});

router.put('/:id', async (req, res) => {
    const { task, title, desc } = req.body;
    const { id } = req.params;

    try {
        const note = await noteModel.findById(id);
        if (!note) {
            return res.json({
                msg: 'Note not found',
            });
        }

        const updateNote = await noteModel.findByIdAndUpdate(
            id,
            {
                task,
                title,
                desc,
            },
            { new: true },
        );
        return res.json({
            data: updateNote,
            msg: 'Update Successfully',
        });
    } catch (error) {
        res.status(401).send({
            msg: 'Not found',
        });
    }
    return res.json({
        data: updateNote,
        msg: 'Update Successfully',
    });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = noteModel.findById(id);
        if (!note) {
            return res.json({
                msg: 'Note not available',
            });
        }

        await noteModel.findByIdAndRemove(id);
        res.json({
            msg: 'Delete Successfully',
        });
    } catch (error) {
        res.status(401).send({
            msg: error,
        });
    }
    return res.json({
        msg: 'Delete Successfully',
    });
});

module.exports = router;
