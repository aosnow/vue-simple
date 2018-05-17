const I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

function hashCode(input) {
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

export default hashCode;
