import { MenuItemConstructorOptions, shell } from 'electron';

export default class MainMenu {
    template: MenuItemConstructorOptions[] = [
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        await shell.openExternal('https://electronjs.org');
                    },
                },
            ],
        },
    ];
}
