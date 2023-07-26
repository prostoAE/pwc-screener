import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const width = e.pageX - startX;
            const height = e.pageY - startY;
            ipcRenderer.send('selectionRect', { width, height });
        }
    });

    document.addEventListener('mouseup', (e) => {
        isDragging = false;
        ipcRenderer.send('SELECT_REGION', {
            x: startX,
            y: startY,
            width: e.pageX - startX,
            height: e.pageY - startY,
        });
    });
});
