import express from 'express';
import checkAuth from '../middlewares/checkAuth.js';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
} from '../controllers/taskController.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.use(checkAuth);

router.post('/task', createTask);
router.get('/task', getTasksByUserId);
router.get('/task/all', checkAdmin, getAllTasks);
router.get('/task/:id', getTaskById);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;
