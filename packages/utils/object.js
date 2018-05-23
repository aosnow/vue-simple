/**
 * 顺序搜索指定对象中是否存在相匹配的值
 * @param {Object} src 来源对象
 * @param {*} search 待搜索项
 * @returns {{key:String,value:*}|null}
 */
const objectIndexOf = (src, search) => {
  const a = Object.keys(src);

  for (let i = 0; i < a.length; i++) {
    const key = a[i];

    if (src[key] === search) {
      return { key, value: src[key] };
    }
  }

  return null;
};

/**
 * 逆序搜索指定对象中是否存在相匹配的值
 * @param {Object} src 来源对象
 * @param {*} search 待搜索项
 * @returns {{key:String,value:*}|null}
 */
const objectLastIndexOf = (src, search) => {
  const a = Object.keys(src);

  for (let i = a.length - 1; i >= 0; i--) {
    const key = a[i];

    if (src[key] === search) {
      return { key, value: src[key] };
    }
  }

  return null;
};

export { objectIndexOf, objectLastIndexOf };
