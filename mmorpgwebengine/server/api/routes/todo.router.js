import Express from 'express';
import * as todoHander from '../handlers/todo.handler';

const router = Express.Router();

router.get('/', todoHander.getAll);
router.get('/:id', todoHander.getOne);
router.post('', todoHander.createTodo);
router.put('', todoHander.updateTodo);
router.delete('/:id', todoHander.deleteTodo);

module.exports = router;
