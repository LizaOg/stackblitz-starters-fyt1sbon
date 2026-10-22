import sqli from 'sqlite3';
import { isEmpty } from '../untils';
export default class SqliteLinker {}

class SqliLinker {
  constructor(filename) {
    this.filename = filename;
    this.db = null;
  }

  //подключение к бд
  async connect() {
    this.db = new sqli.Database(this.filename, function (err) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      Cosnole.log(`Database is started...on the ${this.filename}`);
    });
  }
  /**
   * в общем выполняет SQL запрос на добавление/изменение/удаление данных из бд
   * создается Promise, чтобы дождаться окнчания операции с бд
   * проверяет на наличие ошибок
   * если возникнут, то уведомляет Promise и выводит в консоль уведомление об этом,останавливая работу
   * возращает lastID и changes
   */
  async run(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      //resolve- можем вернуть результат, когда хорошо сработал callback
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve({
          lastId: this.lastID,
          changes: this.changes,
        });
      });
    });

    return result;
  }
  /**
   * в общем выполняет SQL запрос на возращение 1 строки из бд
   * создается Promise, чтобы дождаться окнчания операции с бд
   * проверяет на наличие ошибок
   * если возникнут, то уведомляет Promise и выводит в консоль уведомление об этом,останавливая работу
   * если ошибки нет, то выводит строку как результат
   */
  async get(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.get(sql, params, function (err, row) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(row);
      });
    });

    return result;
  }
  /**
   * в общем выполняет SQL запрос на возращение всех строк из бд
   * создается Promise, чтобы дождаться окнчания операции с бд
   * проверяет на наличие ошибок
   * если возникнут, то уведомляет Promise и выводит в консоль уведомление об этом,останавливая работу
   * если ошибки нет, то выводит массив строк как результат
   */
  async all(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.all(sql, params, function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(rows);
      });
    });

    return result;
  }
  //закрывает/обрывает связь с бд
  async close() {
    return new Promise(function (resolve, reject) {
      this.db.all(sql, params, function (err, rows) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
  createPlaceholders(arr) {
    return arr.map(() => '?').join(', '); //передача массива, перебираем именяем значение на ?, итог: ?, ?, ?, ?
  }

  createSetBlock(properties) {
    const value = [];
    const block = Object.entries(properties)
      .map(([key, value]) => {
        if (isEmpty(value)) return null;

        values.push(value);
        return `${key} =?`;
      })
      .filter((p) => p !== null)
      .join(', ');

    return { block, values };
  }
}
