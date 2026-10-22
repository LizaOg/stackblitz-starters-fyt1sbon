export default router;
import Router from '@koa/router';
import ItemController from './item-controller.js';

// import {
//   getItem,
//   getItems,
//   deleteItem,
//   updateItem,
//   createItem,
// } from './item-controller.js';

const router = new Router({
  prefix: '/items',
});
const controller = new ItemController();
router.get('/', controller.getItems.bind(controller));
router.get('/:id', controller.getItem.bind(controller)); //достаем единичный парамтр
router.patch('/:id', controller.updateItem.bind(controller)); //при создании дожен быть айди
router.post('/:id', controller.createItems.bind(controller));
router.delete('/:id', controller.deleteItems.bind(controller));
