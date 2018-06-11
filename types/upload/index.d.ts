// ------------------------------------------------------------------------------
//
// index.d
// author: 喵大斯( h5devs.com/h5devs.net )
// created: 2018/6/11
// copyright (c) 2015 喵大斯( aosnow@yeah.net )
//
// ------------------------------------------------------------------------------

import * as EventTypes from './events';

declare namespace ReadType
{

  /**
   * 按字节读取文件内容，结果用ArrayBuffer对象表示
   */
  export var ArrayBuffer:string;

  /**
   * 按字节读取文件内容，结果为文件的二进制串
   */
  export var BinaryString:string;

  /**
   * 读取文件内容，结果用data:url的字符串形式表示
   */
  export var DataURL:string;

  /**
   * 按字符读取文件内容，结果用字符串形式表示
   */
  export var Text:string;
}

/**
 * 异步读取图片数据为 base64
 * @param {File} rawFile
 * @param {String} type
 * @return
 */
declare function readfile( rawFile:any, type:string ):Promise;

declare function FileSelector( Vue );

/**
 * 给指定元素绑定文件选择窗口事件
 * @param {HTMLElement} el HTML元素
 * @param {Boolean} multiple 是否可多选
 * @param {String} accept 指定能选择的文件类型 mime
 * @param {Function} change 当选择文件后调用的回调
 */
declare function FileOpenerBinder( { el, multiple, accept, change } );

/**
 * 给指定元素绑定文件拖拽事件
 * @param {HTMLElement} el HTML元素
 * @param {Boolean} multiple 是否可多选
 * @param {String} accept 指定能选择的文件类型 mime
 * @param {Function} change 当选择文件后调用的回调
 * @param {Function} [enter] 当拖拽进入区域内时的回调
 * @param {Function} [leave] 当拖拽离开区域内时的回调
 * @param {Function} [dragover] 当拖拽进入区域后在该区域内移动时的回调
 * @constructor
 */
declare function FileDraggerBinder( { el, multiple, accept, change, enter, leave, dragover } )

export { readfile, ReadType, FileSelector, EventTypes, FileOpenerBinder, FileDraggerBinder };
