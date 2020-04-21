import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sessionStore } from "./stores";

export default class {
    constructor(url, logLevel) {
        logLevel = logLevel || LogLevel.Information;
        this.token = "";
        sessionStore.subscribe(session => {
            this.token = session.token;
        });
        this.connection = new HubConnectionBuilder()
            .withUrl(url, { accessTokenFactory: () => this.token })
            .withAutomaticReconnect()
            .configureLogging(logLevel)
            .build();

        this.start = this.connection.start();
        this.start.catch(err => console.error(err));

        this.connection.onclose(err => console.error(err));
    }

    on(eventType, cb) {
        if (!EventType[eventType]) {
            console.error("Subscription failed. Unknown event type: " + eventType);
            return;
        }
        this.connection.on(eventType, cb);
    }

    createGame(name) {
        return this.send("CreateGame", { name });
    }

    joinGame(gameId) {
        return this.send("JoinGame", { gameId })
    }

    leaveGame(gameId) {
        return this.send("LeaveGame", { gameId })
    }

    startGame(gameId) {
        return this.send("StartGame", { gameId });
    }

    async send(methodName, msg) {
        await this.start;
        return this.connection.send(methodName, msg);
    }

    stop() {
        return this.connection.stop();
    }

}

export const EventType = {
    GameCreated: "GameCreated",
    PlayerJoined: "PlayerJoined",
    PlayerLeft: "PlayerLeft",
    GameStarted: "GameStarted",
    GameDestroyed: "GameDestroyed",
    Error: "Error",
};