const db = require('./postgres');

function create(crossword, ownerid, cb) {
    crossword.createddate = new Date();
    crossword.owner = ownerid;
    db.insert('crosswords', crossword, (e, created_crossword) => {
        if (e) {
            cb(e);
        } else {
            cb(null, created_crossword[0]);
        }
    });
}

function getAll(cb) {
    db.get('crosswords', {}, cb);
}

function update(crossword, cb) {
    db.updateById('crosswords', crossword, cb);
}

function addGrid(grid, cb) {
    db.insert('grids', { grid }, cb);
}

function getGrids(cb) {
    db.get('grids', {}, cb);
}

module.exports = {
    create,
    getAll,
    update,
    addGrid,
    getGrids
};
