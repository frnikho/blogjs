export default {}

const express = require("express");
const next = require("next");

const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "Too many request send from your IP, please try again later"
})

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());

    server.use("/", apiLimiter);

    server.all('**/*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
}).catch((err) => {
    console.error(err.stack);
    process.exit(-1);
});