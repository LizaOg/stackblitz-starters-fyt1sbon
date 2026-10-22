import { isString, isNumber, isNotEmpty } from '../../untils.js';
export default class FlootDto {
  constructor({ name, structure_id }) {
    this.name = name;
    this.structure_id = structure_id;
  }

  #checkObject() {
    if (!isString(this.name) && !isNamber(this.structure_id)) {
      if (!isNotEmpty(this.name) && !isNotEmpty(this.structure_id)) {
        return true;
      }
      return false;
    }
    return false;
  }

  get object() {
    if (!this.#checkObject()) throw new Error('oshibka');

    return {
      name: this.name,
      structure_id: this.structure_id,
    };
  }
}
