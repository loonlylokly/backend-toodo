import { insertTaskSchema, requestSchema, selectTaskSchema } from 'db/schema';
import { type Request, Response } from 'express';
import TasksService from 'services/TasksService';

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const taskCreated = await TasksService.create(
        insertTaskSchema.parse(req.body)
      );
      res.json(taskCreated);
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tasks = await TasksService.getAll();
      return res.json(tasks);
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const task = await TasksService.getOne(requestSchema.parse({ id }).id);
      return res.json(task);
    } catch (e) {
      console.log(e);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedTask = await TasksService.update(
        selectTaskSchema.parse(req.body)
      );
      return res.json(updatedTask);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id);
      const task = await TasksService.delete(requestSchema.parse({ id }).id);
      return res.json(task);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new TaskController();
