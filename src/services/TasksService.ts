import { db } from 'db';
import { eq } from 'drizzle-orm';
import { type TTaskId, type TInsertTask, tasks } from 'db/schema';

class TasksService {
  async create(task: TInsertTask) {
    const createdTask = await db.insert(tasks).values(task).returning();
    return createdTask;
  }

  async getAll() {
    const allTasks = await db.select().from(tasks);
    return allTasks;
  }
  async getOne(id: TTaskId) {
    if (!id) {
      throw new Error('set id');
    }
    const task = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async update(task: TInsertTask) {
    if (!task.id) {
      throw new Error('set id');
    }
    const updatedTask = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, task.id))
      .returning();
    return updatedTask;
  }

  async delete(id: TTaskId) {
    if (!id) {
      throw new Error('set id');
    }
    const task = await db.delete(tasks).where(eq(tasks.id, id)).returning();
    return task;
  }
}

export default new TasksService();
