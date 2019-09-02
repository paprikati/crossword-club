const grids = require('./grids');
const fs = require('fs');

fs.writeFileSync('./grids.json', JSON.stringify(grids));
