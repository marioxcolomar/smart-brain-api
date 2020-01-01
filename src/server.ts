import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import * as knex from 'knex';
require('dotenv').config()
import morgan from 'morgan'

import handleRegister from './controllers/register';
import handleSignin from './controllers/signin';
import handleProfileGet from './controllers/profile';
import {
	handleApiCall,
	handleImage
} from './controllers/image';

const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send(db) })
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
