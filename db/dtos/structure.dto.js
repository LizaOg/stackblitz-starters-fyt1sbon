//структуризация входящих объектов
import { isString, isNotEmpty } from '../../untils.js';

export default class StructureDto {
  constructor({ name, address }) {
    this.name = name;
    this.address = address;
  }

  //создаем массви перебора и если бдует 1 тру выведет тру, если будет фолс выведет фолс
  #checkObject() {
      return ['name', 'address'].every((p) => {
      return isString(this[p]) && isNotEmpty(this[p]);
    });
  }

  //DTO - проверка данных,попадающих в таблицу
  get object() {
    if (!this.#checkObject()) throw new Error('oshibka');

    return {
      name: this.name,
      address: this.address,
    };
  }
}

// new StructureDto({ name: 'max', address: 'aderessssssszzzzzzzzzzzzzzzzz' }); // вызов структуры ДТО
// (new StructureDto({})).object // вызов функции getobject
