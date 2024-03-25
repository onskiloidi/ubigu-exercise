import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { App } from '@client/App';
import { createRoot } from 'react-dom/client';
document.addEventListener('DOMContentLoaded', async () => {
    const appDiv = document.getElementById('app');
    if (appDiv) {
        createRoot(appDiv).render(_jsx(App, {}));
    }
});
