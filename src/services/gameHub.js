import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { sessionStore } from "./stores";

export default class {
    constructor() {
        this.token = "";
        sessionStore.subscribe(session => (this.token = session.token));
    }

    start(url, gameId, logLevel){
        logLevel = logLevel || LogLevel.Information;
        this.gameId = gameId;
        this.connection = new HubConnectionBuilder()
            .withUrl(url += "?gameId=" + this.gameId, { accessTokenFactory: () => this.token })
            .withAutomaticReconnect()
            .configureLogging(logLevel)
            .build();

        this.start = this.connection.start();
        return this.start;
    }

    on(eventType, cb) {
        if (!EventType[eventType]) {
            console.error("Subscription failed. Unknown event type: " + eventType);
            return;
        }
        this.connection.on(eventType, cb);
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
        return this.connection.send(methodName, msg);
    }

    stop() {
        return this.connection.stop();
    }

}

export const EventType = {
    GameChanged: "GameChanged",
    AvailableActionTypesChanged: "AvailableActionTypesChanged",
    GameEnded: "GameEnded",
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