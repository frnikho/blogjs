const express = require("express");
const next = require("next");

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
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
    server.use(cookieParser());
    server.use(fileUpload());
    server.use('/public', express.static('public'));
    server.use("/", apiLimiter);

    server.disable('x-powered-by');

    server.all('**/*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
    });
}).catch((err) => {
    console.error(err.stack);
    process.exit(-1);
});

//export default app;
