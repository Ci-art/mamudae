import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import users from './routes/users';
import { restErrorHandler, firebaseErrorHandler } from './middlewares/error';

admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use('/users', users);

app.use(restErrorHandler);
app.use(firebaseErrorHandler);

export const api = functions.https.onRequest(app);
