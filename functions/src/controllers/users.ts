import { RequestHandler } from 'express';
import admin from 'firebase-admin';
import { RestError, UserRequest, UserResult } from '../types';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map<UserResult>((user) => {
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        roles: user.customClaims?.roles,
        lastSignInTime: user.metadata.lastSignInTime,
        creationTime: user.metadata.creationTime,
        lastRefreshTime: user.metadata.lastRefreshTime,
      };
    });
    return res.status(200).send({ users });
  } catch (error) {
    return next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, displayName, roles } = req.body as UserRequest;

    if (!email || !password || !displayName) {
      return next(new RestError(400, '필수 정보 누락!'));
    }

    const { uid } = await admin
      .auth()
      .createUser({ email, password, displayName });
    await admin.auth().setCustomUserClaims(uid, { roles });

    return res.status(201).send({ uid });
  } catch (error) {
    return next(error);
  }
};
