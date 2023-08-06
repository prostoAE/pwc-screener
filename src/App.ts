import {
    BrowserWindow,
    ipcMain,
    screen,
    desktopCapturer,
    NativeImage,
    globalShortcut,
} from 'electron';

declare const OVERLAY_WINDOW_WEBPACK_ENTRY: string;
declare const OVERLAY_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export default class App {
    constructor(public mainWindow: BrowserWindow) {
        this.shortCutRegister();
        this.takeScreenshot();
    }

    private takeScreenshot(): void {
        ipcMain.on('TAKE_SCREENSHOT', () => {
            this.enableCursorSelection();
        });
    }

    private enableCursorSelection() {
        const { width, height } = screen.getPrimaryDisplay().size;

        const overlayWindow = new BrowserWindow({
            width,
            height,
            frame: false,
            transparent: true,
            resizable: false,
            movable: false,
            webPreferences: {
                nodeIntegration: true,
                preload: OVERLAY_WINDOW_PRELOAD_WEBPACK_ENTRY,
            },
        });

        overlayWindow.loadURL(OVERLAY_WINDOW_WEBPACK_ENTRY);

        // overlayWindow.webContents.openDevTools();

        overlayWindow.setIgnoreMouseEvents(false);

        ipcMain.once('SELECT_REGION', (event, region) => {
            this.captureScreenshot(region);
            overlayWindow.close();
        });
    }

    private captureScreenshot(region: Electron.Rectangle) {
        const { width, height } = screen.getPrimaryDisplay().size;

        const thumbnailSize = {
            width,
            height,
        };

        desktopCapturer
            .getSources({
                types: ['screen'],
                thumbnailSize,
            })
            .then(async (sources): Promise<void> => {
                if (!sources.length) {
                    throw new Error('No screen sources available.');
                }

                const nativeImage: NativeImage =
                    sources[0].thumbnail.crop(region);

                const dataUrl: string = nativeImage.toDataURL();
                this.mainWindow.webContents.send('SET_SOURCE', dataUrl);
            });
    }

    private shortCutRegister(): void {
        globalShortcut.register('PrintScreen', () => {
            this.enableCursorSelection();
        });
    }
}
