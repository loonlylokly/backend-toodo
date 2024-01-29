import { db } from 'db';
import { eq, like } from 'drizzle-orm';
import {
  type TTaskId,
  type TInsertTask,
  tasks,
  TSelectTask,
  TTaskText,
} from 'db/schema';

class TasksService {
  async create(task: TInsertTask) {
    const createdTask = await db.insert(tasks).values(task).returning();
    return createdTask;
  }

  async getAll(search: TTaskText) {
    const allTasks = await db
      .select()
      .from(tasks)
      .where(like(tasks.text, `%${search}%`));
    return allTasks;
  }
  async getOne(id: TTaskId) {
    const task = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async update(task: TSelectTask) {
    const updatedTask = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, task.id))
      .returning();
    return updatedTask;
  }

  async delete(id: TTaskId) {
    const task = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return task;
  }
}

export default new TasksService();
