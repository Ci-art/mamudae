import express from 'express';
import { Role } from 'mamudae-core';
import { createUser, getUsers, updateUser } from './../controllers/users';
import {
  authenticateHandler,
  authorizationHandler,
} from './../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  authenticateHandler,
  authorizationHandler({ allowedRoles: [Role.admin] }),
  getUsers
);

router.post(
  '/',
  authenticateHandler,
  authorizationHandler({ allowedRoles: [Role.admin] }),
  createUser
);

router.patch(
  '/:id',
  authenticateHandler,
  authorizationHandler({ allowedRoles: [Role.admin] }),
  updateUser
);

export default router;
