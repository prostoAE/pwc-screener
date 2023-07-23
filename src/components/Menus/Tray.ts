import { nativeImage, Tray, Menu } from 'electron';
import { ICONS } from '../../assets/icons';

export default class TrayMenu {
    private template: Electron.MenuItemConstructorOptions[] = [
        { label: 'Item1', type: 'radio', checked: true },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio' },
        { label: 'Item4', type: 'radio' },
    ];

    constructor() {
        const icon = nativeImage.createFromDataURL(ICONS.tray);
        const tray = new Tray(icon);

        const contextMenu = Menu.buildFromTemplate(this.template);

        tray.setToolTip('This is my application.');
        tray.setContextMenu(contextMenu);
    }
}
