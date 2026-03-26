import Task from '../models/taskModel.js';

export const createTaskService = async (description, userId) => {
  return await Task.create({ description, createdBy: userId });
};

export const updateTaskService = async (taskId, userId, updates) => {
  return await Task.findOneAndUpdate({ _id: taskId, createdBy: userId }, updates, {
    returnDocument: 'after',
    runValidators: true,
  });
};

export const deleteTaskService = async (taskId, userId) => {
  return await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
};

export const getTasksByUserIdService = async (userId) => {
  return await Task.find({ createdBy: userId });
};

export const getAllTasksService = async () => {
  return await Task.find();
};

export const getTaskByIdService = async (taskId, userId) => {
  return await Task.findOne({ _id: taskId, createdBy: userId });
};
