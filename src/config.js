export function getConfig() {
    const hostname = window.location.hostname;

    const hostConfigs = {
        'localhost': {
            hubUrl: 'https://puertorico.azurewebsites.net/game'
            // hubUrl: 'http://localhost:5000/game'
        },
        'storagepuertodev.z16.web.core.windows.net': {
            hubUrl: 'https://puertorico.azurewebsites.net/game'
        },
        'storagepuertodevstage.z16.web.core.windows.net': {
            hubUrl: 'https://puertorico-devstage.azurewebsites.net/game'
        }
    }

    return hostConfigs[hostname];
}