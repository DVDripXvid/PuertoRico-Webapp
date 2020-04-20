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
            .withUrl(url += "?gameId=" + this.gameId, { accessTokenFactory: () => this.token })
            .withAutomaticReconnect()
            .configureLogging(logLevel)
            .build();

        this.start = this.connection.start();
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
        return this.waitForResp
            ? this.connection.invoke(methodName, msg)
            : this.connection.send(methodName, msg);
    }

    stop() {
        return this.connection.stop();
    }

}

export const EventType = {
    GameChanged: "GameChanged",
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