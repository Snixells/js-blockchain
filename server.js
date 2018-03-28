const express = require('express');
const app = express();

const chainRoutes = require('./api/routes/chain_route');
const unconfirmedRoutes = require('./api/routes/unconfirmed_route');

const morgan = require('morgan');

app.use((morgan('dev')));

app.use('/chain', chainRoutes);

app.use('/unconfirmed', unconfirmedRoutes);

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});