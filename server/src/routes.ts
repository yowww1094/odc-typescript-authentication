import { Router } from 'express'
import { addUser, getAllUsers, getUserById } from './user.controller.js';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);

export default router;