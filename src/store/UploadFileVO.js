/**
 * 上传文件数据结构
 * @param {File|Blob|null} data 文件数据
 * @param {String} name 文件名称
 * @returns {{data : *, dir : *}}
 */
export default function(data, name) {
  return {
    data,
    dir: name
  };
}
