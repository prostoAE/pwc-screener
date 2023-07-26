// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('screenshotButton')
        ?.addEventListener('click', () => {
            ipcRenderer.send('TAKE_SCREENSHOT');
        });
});

ipcRenderer.on('SET_SOURCE', (event, src) => {
    const screenshotImage: HTMLImageElement | null = document.getElementById(
        'screenshotImg'
    ) as HTMLImageElement;
    screenshotImage.src = src;
});
