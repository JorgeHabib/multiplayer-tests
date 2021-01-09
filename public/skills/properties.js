export function heal(game, command, ammount){
    game.state.players[command.playerID].health += ammount;

    if(game.state.players[command.playerID].health > game.state.players[command.playerID].totalHealth)
        game.state.players[command.playerID].health = game.state.players[command.playerID].totalHealth;
}

export function reduceMana(game, command, skillID){
    if (game.state.players[command.playerID].mana >= game.state.players[command.playerID].class.skillsManaCost[skillID]) {
        game.state.players[command.playerID].mana -= game.state.players[command.playerID].class.skillsManaCost[skillID];
        return true;
    } else {
        return false;
    }
}

export function initiateCooldownDrop(game, command, skillID) {
    let time = game.state.players[command.playerID].cooldown[skillID];

    const cooldownDrop = setInterval(function () {
        time -= 1;
        game.state.players[command.playerID].cooldown[skillId] -= 1;

        if (time <= 0) {
            clearInterval(coolDownDrop);
            game.state.players[command.playerID].cooldown[skillId] = 0;
        }
    }, 1000)
}