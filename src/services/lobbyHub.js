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
    }

    restart() {
        if (typeof (this.onreconnectingCb) === "function") {
            this.onreconnectingCb();
        }
        this.start = this.connection.start().then(() => {
            if (typeof (this.onreconnectedCb) === "function") {
                this.onreconnectedCb();
            }
        });
        return this.start;
    }

    onreconnecting(cb) {
        this.onreconnectingCb = cb;
        this.connection.onreconnecting(cb);
    }

    onreconnected(cb) {
        this.onreconnectedCb = cb;
        this.connection.onreconnected(cb);
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
    GameEnded: "GameEnded",
    PlayerJoined: "PlayerJoined",
    PlayerLeft: "PlayerLeft",
    GameStarted: "GameStarted",
    GameDestroyed: "GameDestroyed",
    Error: "Error",
};