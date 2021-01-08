import { isPlainObject } from 'lodash';

/**
 * Removes null values from object. Returns argument if not an object.
 * @param {Object} obj The object to remove null values from.
 */
export default (obj) => {
  if (!isPlainObject(obj)) return obj;
  const newObj = obj;
  Object.keys(obj).forEach((key) => newObj[key] === null && delete newObj[key]);
  return newObj;
};
