// ------------------------------------------------------------------------------
//
// StateStorage
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/5/12
// copyright (c) 2015 喵大斯( aosnow@yeah.net )
//
// ------------------------------------------------------------------------------

export declare interface StateStorage
{
  type:string;
  storage:Storage | Map;

  /**
   * 清除所有存储内容
   */
  clear():void;

  /**
   * 获取指定 key 对应的缓存内容
   * @param {string} key
   * @returns {string | null}
   */
  getItem( key:string ):string | null;

  /**
   * 移除指定 key 对应的缓存
   * @param {string} key
   */
  removeItem( key:string ):void;

  /**
   * 为指定 key 设置新的缓存内容
   * @param {string} key
   * @param {string} data
   */
  setItem( key:string, data:string ):void;
}
