export function diff(lhs, rhs) {
  const result = new Map();

  const properies = new Set([].concat(Object.keys(lhs), Object.keys(rhs)));

  for (let property of properies) {
    if (lhs.hasOwnProperty(property) && !rhs.hasOwnProperty(property)) {
      result.set(property, 'delete');
    }

    if (!lhs.hasOwnProperty(property) && rhs.hasOwnProperty(property)) {
      result.set(property, 'create');
    }

    if (lhs.hasOwnProperty(property) && rhs.hasOwnProperty(property)) {
      if (lhs[property] !== rhs[property]) {
        result.set(property, 'update');
      }
    }
  }

  return result;
}