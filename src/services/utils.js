export function hasWorkingBuilding(player, buildingName) {
    return player.buildings.some(b => b.name === buildingName && b.workCount > 0);
}

export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}