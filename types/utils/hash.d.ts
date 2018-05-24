declare var I64BIT_TABLE:Array<string>;

/**
 * 根据指定内容生成对应哈希编码
 * @param input
 * @return
 */
declare function hash( input:string ):string;

/**
 * 生成请求时所需唯一标识码（out_request_no）
 * @returns {string}
 */
function timehash( input:string ):string;

export { hash, timehash };
