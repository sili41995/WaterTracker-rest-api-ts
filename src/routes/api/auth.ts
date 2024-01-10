import express from 'express';
import {
  signUp,
  signIn,
  signOut,
  current,
  updateAvatar,
  updateProfile,
  restorePassword,
  updatePassword,
} from '../../controllers/auth';
import { validateBody, authenticate, upload } from '../../middlewares';
import {
  signUpSchema,
  signInSchema,
  updateProfileSchema,
  updatePasswordSchema,
  restorePasswordSchema,
} from '../../models/user';
import { notEmptyBodySchema } from '../../schemas';

const router = express.Router();

router.post(
  '/signup',
  validateBody(notEmptyBodySchema),
  validateBody(signUpSchema),
  signUp
);
router.post(
  '/signin',
  validateBody(notEmptyBodySchema),
  validateBody(signInSchema),
  signIn
);
router.post('/signout', authenticate, signOut);
router.get('/current', authenticate, current);
router.put(
  '/profile',
  authenticate,
  validateBody(updateProfileSchema),
  updateProfile
);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);
router.post(
  '/restore-password',
  validateBody(restorePasswordSchema),
  restorePassword
);
router.patch(
  '/restore-password/:restorePasswordToken',
  validateBody(updatePasswordSchema),
  updatePassword
);

export default router;
