import { Router } from 'express';

import userRouter from './user';
import playerRouter from './player';

// This router is mounted at /api
const router = Router();

router.use('/user', userRouter);
router.use('/player', playerRouter);

export default router;
