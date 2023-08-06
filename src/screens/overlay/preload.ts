import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const selectionRect = document.getElementById('selectionRect');

    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const left = Math.min(startX, e.pageX);
            const top = Math.min(startY, e.pageY);
            const width = Math.abs(e.pageX - startX);
            const height = Math.abs(e.pageY - startY);

            selectionRect.style.opacity = '1';
            selectionRect.style.left = left + 'px';
            selectionRect.style.top = top + 'px';
            selectionRect.style.width = width + 'px';
            selectionRect.style.height = height + 'px';

            ipcRenderer.send('selectionRect', { width, height });
        }
    });

    document.addEventListener('mouseup', (e) => {
        isDragging = false;

        const left = Math.min(startX, e.pageX);
        const top = Math.min(startY, e.pageY);
        const width = Math.abs(e.pageX - startX);
        const height = Math.abs(e.pageY - startY);

        selectionRect.style.border = 'none';

        ipcRenderer.send('SELECT_REGION', {
            x: left,
            y: top,
            width: width,
            height: height,
        });
    });
});
