export function setupSkills(newSkills) {
    Object.assign(state.allSkills, newSkills);
}

export function setupMapMatrix() {
    for (let i = 0; i < state.screen.height; i++) {
        state.mapMatrix[i] = [];

        for (let j = 0; j < state.screen.width; j++) {
            if (i === j) {
                state.mapMatrix[i][j] = 1;
            } else if (i === 0 || i === state.screen.height - 1) {
                state.mapMatrix[i][j] = 1;
            } else if (j === 0 || j === state.screen.width - 1) {
                state.mapMatrix[i][j] = 1;
            } else {
                state.mapMatrix[i][j] = 0;
            }
        }
    }

    const wall = {
        xInit: 0,
        yInit: 0,
        xEnd: state.screen.width,
        yEnd: state.screen.height
    }

    state.wallsArray.push(wall);
}

export function setServerSide(bool) {
    state.serverSide = bool;
}

export function setState(newState) {
    Object.assign(state, newState);
}

export function setupPlayer(player){
    
    player.gold = player.class.gold;

    player.health = player.class.health - 200;
    player.totalHealth = player.class.totalHealth;

    player.damage = player.class.damage;
    player.defense = player.class.defense;

    player.mana = player.class.initialMana;
    player.totalMana = player.class.totalMana;

    const number_of_skills = player.skills.length;
    const cooldownArray = [];

    for (let i = 0; i < number_of_skills; i++)
        cooldownArray.push(0);

    player.cooldown = cooldownArray;

    return player;
}