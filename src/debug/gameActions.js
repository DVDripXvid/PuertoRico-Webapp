import { CommandType } from "../services/gameHub";

const commands = [
    {
        cmd: CommandType.SelectRole,
        data: { roleIndex: 0 }
    },
    {
        cmd: CommandType.TakePlantation,
        data: { tileIndex: 0 }
    },
    {
        cmd: CommandType.Build,
        data: { buildingIndex: 0 }
    },
    {
        cmd: CommandType.StoreGoods,
        data: { goodType: "Corn" }
    },
    {
        cmd: CommandType.MoveColonist,
        data: {
            fromIndex: 0,
            toIndex: 0,
            isMoveFromTile: true,
            isMoveToTile: false,
        }
    },
    {
        cmd: CommandType.SellGood,
        data: { goodType: "Corn" }
    },
    {
        cmd: CommandType.TakeQuarry,
        data: {}
    },
    {
        cmd: CommandType.TakeRandomPlantation,
        data: {}
    },
    {
        cmd: CommandType.UseWharf,
        data: { goodType: "Corn" }
    },
    {
        cmd: CommandType.DeliverGoods,
        data: {
            goodType: "Corn",
            shipCapacity: 4,
        }
    },
    {
        cmd: CommandType.BonusProduction,
        data: { goodType: "Corn" }
    },
    {
        cmd: CommandType.EndPhase,
        data: {}
    },
];

export default commands;