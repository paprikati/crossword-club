const PG = require('postgres-manager');
const tables = require('./postgres.config');
const host =
    process.env.USER === 'ubuntu' ||
    process.env.USERNAME === 'lisa.karlincurtis'
        ? 'crosswords.cc4k4oelkfoj.us-east-2.rds.amazonaws.com'
        : 'localhost';

const dbConf = {
    user: 'ljkc',
    host,
    database: 'crosswords',
    password: 'Sighnomore',
    port: 5432
};

module.exports = PG.connect({ tables, db: dbConf });
