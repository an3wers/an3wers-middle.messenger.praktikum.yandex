/* eslint-disable no-restricted-syntax */

// export default function isEqual(lhs: string, rhs: string): boolean {
//   return lhs === rhs;
// }

type PlainObject<T = any> = {
  [k in string]: T;
} | any;

// Функция, которая проверяет, что это точно объект
function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  
  if (typeof lhs !== 'object' && typeof rhs !== 'object') {
    return lhs === rhs
  }
  
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];

    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      
      // Здесь value и rightValue может быть только массивом или объектом
      // и TypeScript это понимает с помощью Type Guard

      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;
