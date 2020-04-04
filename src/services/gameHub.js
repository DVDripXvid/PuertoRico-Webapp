import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sessionStore } from "./stores";

export default class {
    constructor(url, waitForResp, logLevel) {
        this.waitForResp = waitForResp || false;
        logLevel = logLevel || LogLevel.Information;
        this.token = "";
        this.gameId = "";
        sessionStore.subscribe(session => {
            this.token = session.token;
            this.gameId = session.currentGame;
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

    sendCommand(type, action) {
        const gameId = this.gameId;
        action = action || {};
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
    GameDestroyed: "GameDestroyed",
    AvailableActionTypesChanged: "AvailableActionTypesChanged",
    Error: "Error",
};

export const CommandType = {
    SelectRole: "SelectRole",
    EndPhase: "EndPhase",
    Build: "Build",
    TakePlantation: "TakePlantation",
    TakeQuarry: "TakeQuarry",
    TakeRandomPlantation: "TakeRandomPlantation",
    BonusProduction: "BonusProduction",
    SellGood: "SellGood",
    DeliverGoods: "DeliverGoods",
    UseWharf: "UseWharf",
    StoreGoods: "StoreGoods",
    MoveColonist: "MoveColonist",
    PlaceColonist: "PlaceColonist",
}