var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

function hashCode(input) {
  var hv = 0;
  var src = input;
  var i = 0;
  if (src === undefined) {
    var rnd = Math.random().toString(16);
    var stamp = new Date().getTime().toString(16);
    src = rnd + stamp;
  }
  if (typeof src !== 'string') src = input.toString();
  i = src.length - 1;
  for (; i > -1; i--) {
    hv += (hv << 3) + src.charCodeAt(i);
  }
  var value = hv & 0x7FFFFFFF;
  var retValue = '';
  do {
    retValue += I64BIT_TABLE[value & I64BIT_TABLE.length - 1];
  } while (value >>= 3);
  return retValue;
}

export default hashCode;