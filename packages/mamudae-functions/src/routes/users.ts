import express from 'express';
import { createUser, getUsers, updateUser } from './../controllers/users';
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

router.patch(
  '/:id',
  authenticateHandler,
  authorizationHandler({ allowedRoles: ['admin'] }),
  updateUser
);

export default router;
