rethinkdb = require('rethinkdb');

const dbUsed = 'blockchain';
const tableUsed = 'chain';

module.exports = {
    insertToDatabase(data) {
        // Connecting to database
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;

            // Add the new mined block to the chain database
            rethinkdb.db(dbUsed).table(tableUsed).insert([
                data
            ]).run(connection, (err, result) => {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            })

        })
    },

    // getChain() {
    //     // Connecting to database
    //     let connection = null;
    //     rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
    //         if (err) throw err;
    //         connection = conn;

    //         rethinkdb.db(dbUsed).table(tableUsed).run(connection, (err, cursor) => {
    //             if (err) throw err;
    //             return cursor;
    //             cursor.toArray((err, result) => {
    //                 if (err) throw err;
    //                 // console.log(JSON.stringify(result, null, 2));
    //                 return "result";
    //             })
    //         })
    //     })

    // }

    getChain(chain, callback) {
        // Connecting to database
        let connection = null;
        rethinkdb.connect({ host: 'localhost', port: 28015 }, (err, conn) => {
            if (err) throw err;
            connection = conn;
            rethinkdb.db(dbUsed).table(tableUsed).run(connection, (err, cursor) => {
                if (err) throw err;
                cursor.toArray((err, result) => {
                    if (err) throw err;
                    // console.log(JSON.stringify(result, null, 2));
                    console.log(result + "1");
                    callback(result);
                })
            })
        })

    }
}







