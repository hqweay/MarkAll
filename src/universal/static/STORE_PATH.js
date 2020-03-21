import { app, remote } from 'electron'; // 引入remote模块

// 根据process.type来分辨在哪种模式使用哪种模块
const APP = process.type === 'renderer' ? remote.app : app;

const STORE_PATH = APP.getPath('userData'); // 获取electron应用的用户目录
// /home/hqweay/.config/Electron
export default STORE_PATH; // 暴露出去
