const express = require('express');
const router = express.Router();
const Coinpayments = require('coinpayments');
const bodyParser = require('body-parser');

// Key Name: Unnamed API Key
// Public Key: d1ab7cfa80a01b99fe879fe19a021ba1ede0e81a9af9a193c548451d8451d8da
// Private Key: 407E6fBcCb3566aFB4dbC913DACa1bd46B8DccD40e9bc0Ce5a461b4Ce74b1e81

const client = new Coinpayments({
    key: 'd1ab7cfa80a01b99fe879fe19a021ba1ede0e81a9af9a193c548451d8451d8da',
    secret: '407E6fBcCb3566aFB4dbC913DACa1bd46B8DccD40e9bc0Ce5a461b4Ce74b1e81'
});

router.route('/add').post(async (req, res) => {
    try {
        const { amount, currency, buyer_email } = req.body;

        console.log({
            amount,
            currency1: currency,
            currency2: currency, // Assuming currency2 should be 'BTC'
            buyer_email
        });

        const payment = await client.createTransaction({
            amount,
            currency1: currency,
            currency2: currency, // Assuming currency2 should be 'BTC'
            buyer_email
        });
        crude

        res.send(payment)
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
 console.log("successful payment");
module.exports = router;
