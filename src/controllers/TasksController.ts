import { insertTaskSchema, requestSchema } from 'db/schema';
import { type Request, Response } from 'express';
import TasksService from 'services/TasksService';

class TaskController {
  async create(req: Request, res: Response) {
    const task = await TasksService.create(insertTaskSchema.parse(req.body));
    res.json(task);
  }

  async getAll(req: Request, res: Response) {
    console.log(req.url);
    const tasks = await TasksService.getAll();
    return res.json(tasks);
  }
  async getOne(req: Request, res: Response) {
    console.log(req.url);
    const task = await TasksService.getOne(
      requestSchema.parse(req.params.id).id
    );
    return res.json(task);
  }
  async update(req: Request, res: Response) {
    const updatedTask = await TasksService.update(
      insertTaskSchema.parse(req.body)
    );
    return res.json(updatedTask);
  }
  async delete(req: Request, res: Response) {
    const task = await TasksService.delete(
      requestSchema.parse(req.params.id).id
    );
    return res.json(task);
  }
}

export default new TaskController();
