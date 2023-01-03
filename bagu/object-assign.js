/**
 * Implement simple object.assign
 * @param {any} target
 * @param {any[]} sources
 * @return {object}
 */
function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error('Not an object');
  }

  if (typeof target !== 'object') {
    target = Object(target);
  }

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    // Object.getOwnPropertyDescriptors(source) already returned ALL the descriptors including the symbol descriptor
    //  - returns all own property descriptors of a given object.
    // {<propertyKey>: {configurable: true, enumerable:true, value:<>, writable: true}....}
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    // The static method Object.defineProperty() defines a new property directly on an object,
    // or modifies an existing property on an object, and returns the object
    //  - Object.defineProperty(obj, prop, descriptor)
    //  - Object.defineProperties(obj, props)

    // for (const symbol of Object.getOwnPropertySymbols(source)) {
    //   target[symbol] = source[symbol];
    // }
  }
  return target;
}

const key = Symbol('key');
const a = {
  [key]: 3,
  b: 4,
};
const target = {};
// console.log(objectAssign(target, a));

const source = Object.create(
  {
    a: 3, // prototype
  },
  {
    b: {
      value: 4,
      enumerable: true, // enumerable data descriptor
    },
    c: {
      value: 5, // non-enumerable data descriptor
    },
    d: {
      // non-enumerable accessor descriptor
      get: function () {
        return this._d;
      },
      set: function (value) {
        this._d = value;
      },
    },
    e: {
      // enumerable accessor descriptor
      get: function () {
        return this._e;
      },
      set: function (value) {
        this._e = value;
      },
      enumerable: true,
    },
  },
);

console.log(objectAssign(source));

function shallowCopy(obj) {
  return Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj),
  );
}

// console.log(shallowCopy(a));
