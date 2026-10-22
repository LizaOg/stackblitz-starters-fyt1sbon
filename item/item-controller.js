import ItemService from './item/service';
import { isNotEmptyArray, isString } from '../utils/js';

export class ItemController {
  constructor() {
    this.service = new ItemService();
  }

  async getItem(ctx) {
    const { id } = ctx.params;
    const res = await this.service.getOne(id);

    ctx.status = 200;
    ctx.body = {
      data: res,
    };
  }
  async getItems(ctx) {
    const { ids } = ctx.query;
    const res = await this.service.getAll({ ids });
    ctx.status = 200;
    ctx.body = {
      data: res,
    };
  }
  async deleteItem(ctx) {
    const { id } = ctx.params;

    await this.service.softDelete(id);
    ctx.status = 200;
    ctx.body = {
      status: 200,
      massage: 'OK',
    };
  }
  async updateItem(ctx) {
    
  }
  async createItem(ctx) {
    const {
      name,
      propertis,
      status,
      location_id,
      current_location_id,
      category_id,
    } = ctx.request.body;

    if (
      isNotEmpty(name) ||
      isNotEmpty(properties) ||
      isNotEmpty(status) ||
      isCorrectStatus(EItemStatus, status) ||
      isNotEmpty(location_id) ||
      isNotEmpty(current_location_id) ||
      isNotEmpty(category_id)
    ) {
      return this.service.create({
        name,
        propertis,
        status,
        location_id,
        current_location_id,
        category_id,
      });
      ctx.status = 201;
      ctx.body = {
        data: res,
      };
      return;
    }
    ctx.status = 400;
    ctx.body = {
      status: 400,
      massage: 'Переданы неверный клиентские данные',
    };
  }
}
omomom;
