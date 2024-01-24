import TasksController from 'controllers/TasksController';
import express, { type Router } from 'express';

const router: Router = express.Router();

router.post('/tasks', TasksController.create);
router.get('/tasks', TasksController.getAll);
router.get('/tasks/:id', TasksController.getOne);
router.put('/tasks', TasksController.update);
router.delete('/tasks/:id', TasksController.delete);

export default router;
