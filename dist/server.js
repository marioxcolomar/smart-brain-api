"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const bcrypt_nodejs_1 = require("bcrypt-nodejs");
const cors_1 = require("cors");
const knex = require("knex");
require('dotenv').config();
const morgan_1 = require("morgan");
const register_1 = require("./controllers/register");
const signin_1 = require("./controllers/signin");
const profile_1 = require("./controllers/profile");
const image_1 = require("./controllers/image");
const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});
const app = express_1.default();
app.use(morgan_1.default('combined'));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => { res.send(db); });
app.post('/signin', signin_1.default(db, bcrypt_nodejs_1.default));
app.post('/register', (req, res) => { register_1.default(req, res, db, bcrypt_nodejs_1.default); });
app.get('/profile/:id', (req, res) => { profile_1.default(req, res, db); });
app.put('/image', (req, res) => { image_1.handleImage(req, res, db); });
app.post('/imageurl', (req, res) => { image_1.handleApiCall(req, res); });
app.listen(3000, () => {
    console.log('app is running on port 3000');
});
//# sourceMappingURL=server.js.map