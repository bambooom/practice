// Closures

type ToBeOrNotToBe = {
  toBe: (val: any) => boolean;
  notToBe: (val: any) => boolean;
};

function expects(val: any): ToBeOrNotToBe {
  return {
    toBe: (v) => {
      if (val !== v) throw new Error('Not Equal');
      else return true;
    },
    notToBe: (v) => {
      if (val === v) throw new Error('Equal');
      else return true;
    },
  };
}

/**
 * expects(5).toBe(5); // true
 * expects(5).notToBe(5); // throws "Equal"
 */
