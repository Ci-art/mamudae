import express from 'express';
import { createUser, getUsers } from './../controllers/users';
import {
  authenticateHandler,
  authorizationHandler,
} from './../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  authenticateHandler,
  authorizationHandler({ allowedRoles: ['admin'] }),
  getUsers
);

router.post(
  '/',
  authenticateHandler,
  authorizationHandler({ allowedRoles: ['admin'] }),
  createUser
);

export default router;
