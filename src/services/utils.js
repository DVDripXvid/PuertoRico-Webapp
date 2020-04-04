export function hasWorkingBuilding(player, buildingName) {
    return player.buildings.some(b => b.name === buildingName && b.workCount > 0);
}