const express = require('express');
const app = express();

const chainRoutes = require('./api/routes/chain_route');

const morgan = require('morgan');

app.use((morgan('dev')));

app.use('/chain', chainRoutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});