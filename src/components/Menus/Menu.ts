import { MenuItemConstructorOptions, shell, Menu } from 'electron';

export default class MainMenu {
    private template: MenuItemConstructorOptions[] = [
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More than',
                    click: async () => {
                        await shell.openExternal('https://electronjs.org');
                    },
                },
            ],
        },
    ];

    constructor() {
        const menu = Menu.buildFromTemplate(this.template);
        Menu.setApplicationMenu(menu);
    }
}
