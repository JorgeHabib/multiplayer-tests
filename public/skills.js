export function heal(game, command, ammount) {
    game.state.players[command.playerId].life += ammount;

    if (game.state.players[command.playerId].life > game.state.players[command.playerId].totalLife) {
        game.state.players[command.playerId].life = game.state.players[command.playerId].totalLife;
    }
}

export function reduceMana(game, command, skillId) {
    if (game.state.players[command.playerId].mana >= game.state.players[command.playerId].class.skillsManaCost[skillId]) {
        game.state.players[command.playerId].mana -= game.state.players[command.playerId].class.skillsManaCost[skillId];
        return true;
    } else {
        return false;
    }
}

export function initiateCooldownDrop(game, command, skillId) {
    let time = game.state.players[command.playerId].coolDown[skillId];

    const coolDownDrop = setInterval(function () {
        time -= 1;
        game.state.players[command.playerId].coolDown[skillId] -= 1;

        if (time <= 0) {
            clearInterval(coolDownDrop);
            game.state.players[command.playerId].coolDown[skillId] = 0;
        }
    }, 1000)
}