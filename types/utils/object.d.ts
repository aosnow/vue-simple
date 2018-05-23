/**
 * 顺序搜索指定对象中是否存在相匹配的值
 * @param {Object} src 来源对象
 * @param {*} search 待搜索项
 * @returns {{key:String,value:*}|null}
 */
declare function objectIndexOf( src:any, search:any ):{ key:string, value:any };

/**
 * 逆序搜索指定对象中是否存在相匹配的值
 * @param {Object} src 来源对象
 * @param {*} search 待搜索项
 * @returns {{key:String,value:*}|null}
 */
declare function objectLastIndexOf( src:any, search:any ):{ key:string, value:any };
