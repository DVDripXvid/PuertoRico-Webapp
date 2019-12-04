import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default class {
    constructor(url, waitForResp, logLevel) {
        this.waitForResp = waitForResp;
        logLevel = logLevel || LogLevel.Information;
        this.connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(logLevel)
            .build();

        this.start = this.connection.start();
        this.start.catch(err => console.error(err));

        this.connection.onclose(err => console.error(err));
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

    sendCommand(type, gameId, action) {
        return this.send(type, {
            gameId,
            action
        });
    }

    async send(methodName, msg) {
        await this.start;
        return this.waitForResp
            ? this.connection.invoke(methodName, msg)
            : this.connection.send(methodName, msg);
    }

}

export const EventType = {
    GameCreated: "GameCreated",
    PlayerJoined: "PlayerJoined",
    PlayerLeft: "PlayerLeft",
    GameStarted: "GameStarted",
    GameChanged: "GameChanged",
};

export const CommandType = {
    Build: "Build",
    // TODO: define command types
}