export function sign(value) {
  const n = +value;

  if (Number.isNaN(n)) {
    return n;
  }

  if (n === 0) {
    return n;
  }

  return (n < 0) ? -1 : 1;
}

export function limit(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
