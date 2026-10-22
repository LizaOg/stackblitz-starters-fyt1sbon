export function isString(data) {
  return typeof data === 'string';
}

export function isNumber(data) {
  return typeof data === 'number';
}

export function isEmpty(data) {
  return (
    data === undefined ||
    data === null ||
    JSON.stringify(data) === '{}' ||
    data === ''
  );
}

export function isNotEmpty(data) {
  return (
    data !== undefined ||
    data !== null ||
    JSON.stringify(data) !== '{}' ||
    data !== ''
  );
}

export function IsNotEmptyArray(data){
  return Array.isArray(data) && data.length !== 0; //убеждемся, что массив и не пустой
}
export function isCorrectStatus(enums, status){
  return Object.values(enums). includes(status); // првоеряет. что внутри объекта есть значения со свойством, которое совпадает со второй строчкой, типа  alex = alex
}