

package frontend;

import MauiApp from './MauiApp.js';

class MauiProgram {
    constructor() {
        this.mauiApp = null;
    }

    createMauiAppInstance() {
        try {
            this.mauiApp = new MauiApp();
            if (!this.mauiApp) {
                throw new Error('Failed to create MAUI application instance');
            }
            return this.mauiApp;
        } catch (error) {
            console.error('Error creating MAUI application instance:', error);
            return null;
        }
    }
}

export default MauiProgram;