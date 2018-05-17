import { Api, ApiInstaller } from './api/Api';
import { Interceptor, DefaultError } from './api/interceptor';
import hashCode from './utils/hashCode';
import { PersistedState, PersistedAction, PersistedPlugin, PersistedConfig, STORAGE_TYPE } from './plugins/PersistedState';
import { MIME, BlobFile, Endings } from './file';

export {
// API 通信
Api, ApiInstaller, Interceptor, DefaultError,

// Hash 工具
hashCode,

// 持久化状态
PersistedState, PersistedAction, PersistedPlugin, PersistedConfig, STORAGE_TYPE,

// Excel 和文件相关
MIME, BlobFile, Endings };