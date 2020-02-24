import { shell } from 'electron';
const openUrl = function (url: string) {
    // todo
    shell.openExternal(url);
}
export {
    openUrl,
} 