import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  getTasksByUserIdService,
  updateTaskService,
} from '../services/taskService.js';
import serverError from '../utils/serverError.js';

export const createTask = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user._id;

    const task = await createTaskService(description, userId);

    return res.status(201).json(task);
  } catch (e) {
    return serverError(res);
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const { description, isCompleted } = req.body;

    const task = await updateTaskService(taskId, userId, { description, isCompleted });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (e) {
    return serverError(res);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await deleteTaskService(taskId, userId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (e) {
    return serverError(res);
  }
};

export const getTasksByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await getTasksByUserIdService(userId);
    return res.status(200).json(tasks);
  } catch (e) {
    return serverError(res);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksService();
    return res.status(200).json(tasks);
  } catch (e) {
    return serverError(res);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await getTaskByIdService(taskId, userId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (e) {
    return serverError(res);
  }
};
