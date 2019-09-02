const express = require('express');
const SVC = require('./src/services');
let router = express.Router();

router.post('/create', function(req, res) {
    SVC.create(req.body, req.user.id, (e, createdCrossword) => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        } else {
            res.sendStatus(201);
        }
    });
});

router.post('/update', function(req, res) {
    SVC.update(req.body, e => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        } else {
            res.sendStatus(201);
        }
    });
});

router.get('/', function(req, res) {
    SVC.getAll((e, list) => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        } else {
            res.status(200).send(list);
        }
    });
});

router.post('/grids', function(req, res) {
    SVC.addGrid(req.body, (e, createdGrid) => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        } else {
            res.status(200).send(createdGrid);
        }
    });
});

router.get('/grids', function(req, res) {
    SVC.getGrids((e, grids) => {
        if (e) {
            console.log(e);
            res.status(500).send(e);
        } else {
            res.status(200).send(grids);
        }
    });
});

module.exports = router;
