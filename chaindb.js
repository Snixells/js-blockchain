rethinkdb = require('rethinkdb');

const dbUsed = 'blockchain';
const tableUsedChain = 'chain';
const tableUsedUnconfirmed = 'unconfirmed';

module.exports = {
    insertToChainDatabase(data) {
        // Connecting to database
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;

            // Add the new mined block to the chain database
            rethinkdb.db(dbUsed).table(tableUsedChain).insert([
                data
            ]).run(connection, (err, result) => {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            })

        })
    },

    getChain(callback) {
        // Connecting to database
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;
            rethinkdb.db(dbUsed).table(tableUsedChain).run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray((err, result) => {
                    if (err) throw err;
                    // console.log(JSON.stringify(result, null, 2));
                    console.log(result + "1");
                    callback(result);
                })
            })
        })

    },

    insertToUnconfirmedDatabase(data) {
        // Connecting to database
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;

            // Add the new mined block to the chain database
            rethinkdb.db(dbUsed).table(tableUsedUnconfirmed).insert([
                data
            ]).run(connection, (err, result) => {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            })

        })
    },

    getUnconfirmedDB(callback) {
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;

            rethinkdb.db(dbUsed).table(tableUsedUnconfirmed).run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray((err, result) => {
                    if (err) throw err;
                    console.log("UNCONFIRMED: " + result);
                    callback(result);
                })
            })
        })
    }
}







