import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default class {
    constructor(url, logLevel) {
        logLevel = logLevel || LogLevel.Information;
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(logLevel)
            .build();

        this.connection.start().then(function () {
            console.log("connected");
        });

        this.connection.onclose(err => console.error(err));
    }
}