import { ErrorRequestHandler } from 'express';
import { FirebaseError } from 'firebase-admin';
import { RestError } from '../types';

export const restErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof RestError) {
    return res.status(error.status).send({ error: { message: error.message } });
  } else {
    return next(error);
  }
};

export const firebaseErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (isFirebaseError(error)) {
    console.log(error.stack);
    return res
      .status(error.code === 'auth/id-token-revoked' ? 401 : 500)
      .send({ error: { code: error.code, message: error.message } });
  } else {
    return next(error);
  }
};

const isFirebaseError = (value: any): value is FirebaseError => {
  return (value as FirebaseError).code !== undefined;
};
