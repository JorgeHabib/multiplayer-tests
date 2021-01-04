import createGame from "./createGame";

export function movementKeyPressed(keyPressed){
    if (keyPressed === 'w' || keyPressed === 'W' ||
        keyPressed === 's' || keyPressed === 'S' ||
        keyPressed === 'a' || keyPressed === 'A' ||
        keyPressed === 'd' || keyPressed === 'D')
            return true;

    return false;
}

function vertical_movement(state, player, direction){
    const stepMove = player.class ? player.class.stepMove : 5;
    const playerSide = player.class ? player.class.side : 5;

    let tempY = player.y - (direction * stepMove);

    if(tempY < 0)
        tempY = 0;

    else if (tempY > state.screen.height - playerSide)
        tempY = state.screen.height - playerSide;

    for (let i = player.x; i < player.x + playerSide; i++)
        for(let j = tempY; j < tempY + playerSide; j++)
            if(createGame.state.mapMatrix[i][j] === 1)
                return;

    player.y = tempY;
}

function horizontal_movement(state, player, direction){
    const stepMove = player.class ? player.class.stepMove : 5;
    const playerSide = player.class ? player.class.side : 5;

    let tempX = player.x + (direction * stepMove);

    if (tempX < 0)
        tempX = 0;

    else if (tempX > state.screen.width - playerSide)
        tempX = state.screen.width - playerSide;

    for (let i = tempX; i < tempX + playerSide; i++)
        for (let j = player.y; j < player.y + playerSide; j++)
            if (createGame.state.mapMatrix[i][j] === 1)
                return;

    player.x = tempX;
}

export function movePlayer(game, command) {
    const state = game.state;
    const player = game.player;

    game.notifyAll(command);

    const acceptedMoves = {
        w(player) { vertical_movement(state, player, 1) }, W(player) { vertical_movement(state, player, 1) },

        s(player) { vertical_movement(state, player, -1) }, S(player) { vertical_movement(state, player, -1) },

        a(player) { horizontal_movement(state, player, -1) }, A(player) { horizontal_movement(state, player, -1) },

        d(player) { horizontal_movement(state, player, 1) }, D(player) { horizontal_movement(state, player, 1) }
    }

    return acceptedMoves;
}

export function moveSkillShootRegular(game, objSkill, velVector, command, index) {
    const state = game.state;
    velVector.x *= objSkill.velocity;
    velVector.y *= objSkill.velocity;

    const skillLoop = setInterval(function () {
        const skill = state.skillShoots[index];

        skill.x += velVector.x;
        skill.y += velVector.y;

        if (collisionSkillWall(skill, command) || collisionSkillStructure(skill, command) || collisionSkillPlayer(skill, command)) {
            clearInterval(skillLoop);
            state.skillShoots.splice(index, 1);
            console.log('HIT PLAYER');
        }
    }, 3);
}