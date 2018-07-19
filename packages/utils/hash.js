const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

/**
 * 根据指定内容生成对应哈希编码
 * @param {String} [input]
 * @return {String}
 */
function hash(input) {
  let hv = 0;
  let src = input;
  let i = 0;
  if (src === undefined) {
    const rnd = Math.random().toString(16);
    const stamp = new Date().getTime().toString(16);
    src = rnd + stamp;
  }
  if (typeof src !== 'string') src = input.toString();
  i = src.length - 1;
  for (; i > -1; i--) {
    hv += (hv << 3) + src.charCodeAt(i);
  }
  let value = hv & 0x7FFFFFFF;
  let retValue = '';
  do {
    retValue += I64BIT_TABLE[value & (I64BIT_TABLE.length - 1)];
  }
  while (value >>= 3);
  return retValue;
}

/**
 * 生成请求时所需唯一标识码（out_request_no）
 * @returns {string}
 */
function timehash() {
  const date = new Date();
  const p = {
    y: date.getFullYear(),
    m: `0${date.getMonth() + 1}`.substr(-2),
    d: `0${date.getDate()}`.substr(-2),
    h: `0${date.getHours()}`.substr(-2),
    i: `0${date.getMinutes()}`.substr(-2),
    s: `0${date.getSeconds()}`.substr(-2)
  };
  return `${p.y}${p.m}${p.d}${p.h}${p.i}${p.s}${hash()}`;
}

export { hash, timehash };
