export function getConfig() {
    const hostname = window.location.hostname;

    const hostConfigs = {
        'localhost': {
            hubUrl: 'https://puerto-rico-api.herokuapp.com/lobby'
            // hubUrl: 'http://localhost:5000/lobby'
        },
        'puertorico.netlify.app': {
            hubUrl: 'https://puertorico.azurewebsites.net/lobby'
            // dyno has been sacrified on the altar of $$$
            // hubUrl: 'https://puerto-rico-api.herokuapp.com/lobby'
        }
    }

    return hostConfigs[hostname];
}
