export function getConfig() {
    const hostname = window.location.hostname;

    const hostConfigs = {
        'localhost': {
            hubUrl: 'https://puertorico.azurewebsites.net/lobby'
            // hubUrl: 'http://localhost:5000/lobby'
        },
        'storagepuertodev.z16.web.core.windows.net': {
            hubUrl: 'https://puertorico.azurewebsites.net/lobby'
        },
        'storagepuertodevstage.z16.web.core.windows.net': {
            hubUrl: 'https://puertorico-devstage.azurewebsites.net/lobby'
        }
    }

    return hostConfigs[hostname];
}