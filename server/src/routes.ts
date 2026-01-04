import { Router } from 'express'
import { getAllUsers, getUserById } from './user.controller.js';
import { loginUser, registerUser } from './auth.controller.js';
import { isAuthenticated } from './auth.middleware.js';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get('/users', isAuthenticated, getAllUsers);
router.get('/users/:id',isAuthenticated, getUserById);
// router.post('/users', addUser);

export default router;