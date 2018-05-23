declare var Endings:{
  transparent:string;
  native:string;
};

/**
 * BlobFile 文件辅助类
 */
declare interface BlobFile
{

  new ( param:{ data, filename, mime, endings } );

  /**
   * @type {Array<*>|Blob} data 数据内容源
   */
  readonly data:Array<any> | Blob;
  readonly extension:string;
  readonly fullname:string;

  /**
   * 创建 Blob 对象
   */
  create():void;

  /**
   * 立即下载该文件到本地
   */
  download():void;

  /**
   * 注销释放内存
   */
  destory():void;

  /**
   * 根据 mime 类型解析文件扩展名
   * @param mime
   * @return
   */
  parseExtension( mime:any ):string;
}

declare const BlobFile:{
  /**
   * 检测指定文件数据的类型
   * @param data
   * @return
   */
  typeOf( data:any ):string;

  /**
   * 根据 mime 类型解析文件扩展名
   * @param mime
   * @return {String}
   */
  parseExtension(mime):string;
};

export { BlobFile, Endings };
