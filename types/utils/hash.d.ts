declare var I64BIT_TABLE:Array<string>;

/**
 * 根据指定内容生成对应哈希编码
 * @param {String} [input]
 * @return {String}
 */
declare function hash( input?:string ):string;

/**
 * 生成请求时所需唯一标识码（out_request_no）
 * @return {String}
 */
function timehash():string;

export { hash, timehash };
