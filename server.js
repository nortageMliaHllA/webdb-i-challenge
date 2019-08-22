const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
// SELECT * FROM Posts /
server.get('/', (req, res) => {
    db('accounts')
    .then(accounts => {
        res.json(accounts)
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get posts'});
    });
});

// POST/ID /
server.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id })
    .then(accounts => {
        if (accounts) {
            res.json(accounts);
        } else {
            res.status(404).json({message: 'Invalid id post'});
        }
    })
    .catch(error => {
        res.status(500).json({message: 'Failed to get post'});
    });
});

// POST INSERT /
server.post('/', (req, res) => {
    const newData = req.body;
    db('accounts').insert(newData)
    .then(accounts => {
        res.status(201).json({accounts});
    })
    .catch(error => {
        console.log('budget err', error);
        res.status(500).json({ message: 'Failed to get post'});       
    });
});

// PUT/:ID /
server.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('accounts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({updated: count});
        } else {
            res.status(404).json({message: 'Invalid post id'});
        }
    })
    .catch(error => {
        console.log('budget err', error);
        res.status(500).json({ message: 'Failed to get post'}); 
    });
});

// DELETE /
server.delete('/', (req, res) => {
    const { id } = req.params;
    db('accounts').where({ id }).del()
    .then(count => {
        if (count) {
            res.json({deleted: count});
        } else {
            res.status(404).json({message:'Invalid post id'});
        }
    })
    .catch(error => {
        console.log('budget err', error);
        res.status(500).json({ message: 'Failed to get post'});
    });
});

module.exports = server;