var express = require('express');
const fs = require('fs');
var path = require('path');

var router = express.Router();

const jsonFile = 'orders.json';

router.get('/', function(req, res, next) {
    try {
        // TODO: fix this path
        const orders = JSON.parse(fs.readFileSync(path.join(__dirname, jsonFile), 'utf8'));
        res.status(200).json({data: orders, status: 200});
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR", status: 200});
    }
});

router.post('/', async function(req, res, next) {
    try {
        let payload = req.body.payload;
        console.log("PAYLOAD ", payload);
        const orders = JSON.parse(fs.readFileSync(path.join(__dirname, jsonFile), 'utf8'));
        orders.push(payload);
        fs.writeFile(path.join(__dirname, jsonFile), JSON.stringify(orders), (err) => {
            if (err) {
                res.status(400).json({message: 'Bad Request', status: 400});
            } else {
                console.log('OK');
                res.status(200).json({data: payload, status: 200});
            }
        });
    } catch (error) {
        console.log('ERROR ', error);
        res.status(500).json({message: "INTERNAL SERVER ERROR", status: 200});
    }
});

module.exports = router;
