import express from 'express';
import { pool } from '../config/dbconfig'

const router = express.Router();
  
router.get('/roomDetails/:roomId', async (req: any, res: any) => {
    
});

export default router;