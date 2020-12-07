import functions from 'firebase-functions';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

admin.initializeApp();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

export const api = functions.https.onRequest(app);
