import { RequestHandler } from 'express';
import admin from 'firebase-admin';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { RestError, UserRequest, UserResult } from '../types';

const mapUser = (user: UserRecord) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    roles: user.customClaims?.roles,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
    lastRefreshTime: user.metadata.lastRefreshTime,
  };
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map<UserResult>(mapUser);
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

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { displayName, roles } = req.body as UserRequest;

    if (!id) {
      return next(new RestError(400, '필수 정보 누락!'));
    }

    const user = await admin.auth().updateUser(id, { displayName });

    if (roles) {
      await admin.auth().setCustomUserClaims(id, { roles });
    }

    return res.status(204).send({ user: mapUser(user) });
  } catch (error) {
    return next(error);
  }
};
