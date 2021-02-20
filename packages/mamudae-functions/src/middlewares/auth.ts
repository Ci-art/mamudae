import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { RequestHandler } from 'express';
import { RestError, Role, UserRequest } from '../types';

export const authenticateHandler: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith('Bearer')) {
    return next(createUnauthorizedError());
  }

  const token = authorization.split('Bearer ')[1];

  if (!token) {
    return next(createUnauthorizedError());
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(token, true);

    res.locals = {
      ...res.locals,
      uid: decodedIdToken.uid,
      roles: decodedIdToken.roles,
      email: decodedIdToken.email,
    };

    return next();
  } catch (error) {
    if (error.code === 'auth/id-token-revoked') {
      return next(error);
    } else {
      return next(createUnauthorizedError());
    }
  }
};

export const authorizationHandler = (options: {
  allowedRoles: Role[];
  allowSameUser?: boolean;
}): RequestHandler => {
  return (req, res, next) => {
    const { uid, roles, email } = res.locals as UserRequest;
    const { id } = req.params;

    if (email === functions.config().mamudae.admin.email) {
      return next();
    }

    if (options.allowSameUser && id && uid === id) {
      return next();
    }

    if (roles) {
      options.allowedRoles.forEach((role) => {
        if (roles[role]) {
          return next();
        }
      });
    }

    return next(new RestError(403, '접근 권한이 없습니다!'));
  };
};

const createUnauthorizedError = () => {
  return new RestError(401, '인증되지 않았습니다!');
};
