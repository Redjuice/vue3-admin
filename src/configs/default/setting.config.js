// @ts-nocheck
/**
 * @description 导出默认通用配置
 */
import { getBaseUrL } from '../utils';

const setting = {
  // 默认的接口地址
  baseURL: getBaseUrL(),
  // API版本
  apiVersion: import.meta.env && `${import.meta.env.VITE_APP_AXIOS_BASE_URL}`,
  // 代理地址
  proxyURL: import.meta.env && `${import.meta.env.VITE_API_ROOT}`,
  // 图片上传地址
  uploadUrl: getBaseUrL() + 'common/upload',
  // 开发环境端口号
  devPort: '9527',
  // 开发环境启动时自动在浏览器中打开应用程序
  devOpen: true,
  // 开发环境启用 TLS + HTTP/2
  devHttps: true,
  // 标题 （包括页面的标题 浏览器的标题）
  title: 'Base管理系统',
  // 不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/403'],
  // 加载时显示文字
  loadingText: '正在加载中...',
  // token在localStorage、sessionStorage、cookie存储的key的名称
  tokenName: 'accessToken',
  // 用户信息在localStorage、sessionStorage、cookie存储的key的名称
  userName: 'accessUser',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  // 上传图片限制大小(MB)
  imageSize: 10,
  // 上传视频限制大小(MB)
  videoSize: 100,
  // 表格显示条数
  pageSize: 20
};

export default setting;
