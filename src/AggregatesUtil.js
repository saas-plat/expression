// 聚合函数库

// COUNT():统计指定列不为NULL=>undefined的记录行数;
export const count = (array, by) => {
  if (array === void 0) {
    return 0;
  }
  if (!Array.isArray(array)) {
    if (by) {
      return array[by] !== void 0 ? 1 : 0;
    }
    return 1;
  }
  if (by) {
    return array.filter(it => it[by] !== void 0).length;
  }
  return array.filter(it => it !== void 0).length;
}

// MAX():计算指定列的最大值,如果指定列是字符串类型,那么使用字符串排序运算=>NaN;
export const max = (array, by) => {
  if (array === void 0) {
    return NaN;
  }
  if (!Array.isArray(array)) {
    if (by) {
      return array[by] !== void 0 ? array[by] : NaN;
    }
    return parseFloat(array);
  }
  if (by) {
    return Math.max(...array.map(it => it[by]));
  }
  return Math.max(...array);
}

// MIN():计算指定列的最小值,如果指定列是字符串类型,那么使用字符串排序运算=>NaN
export const min = (array, by) => {
  if (array === void 0) {
    return NaN;
  }
  if (!Array.isArray(array)) {
    if (by) {
      return array[by] !== void 0 ? array[by] : NaN;
    }
    return parseFloat(array);
  }
  if (by) {
    return Math.min(...array.map(it => it[by]));
  }
  return Math.min(...array);
}

// SUM():计算指定列的数值和,如果指定列类型不是数值类型,那么计算结果为0=>NaN;
export const sum = (array, by) => {
  if (array === void 0) {
    return NaN;
  }
  if (!Array.isArray(array)) {
    if (by) {
      return array[by] !== void 0 ? array[by] : NaN;
    }
    return parseFloat(array);
  }
  if (by) {
    return array.reduce((v, it) => v + parseFloat(it[by]), 0);
  }
  return array.reduce((v, it) => v + parseFloat(it), 0);
}

// AVG():计算指定列的平均值,如果指定列类型不是数值类型,那么计算结果为0=>NaN;
export const avg = (array, by) => {
  if (array === void 0) {
    return NaN;
  }
  if (!Array.isArray(array)) {
    if (by) {
      return array[by] !== void 0 ? array[by] : NaN;
    }
    return parseFloat(array);
  }
  if (by) {
    return array.reduce((v, it) => v + parseFloat(it[by]), 0) / array.length;
  }
  return array.reduce((v, it) => v + parseFloat(it), 0) / array.length;
}
