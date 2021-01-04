export function spellKeyPressed(keyPressed){
    if (keyPressed === 'q' || keyPressed === 'Q' ||
        keyPressed === 'e' || keyPressed === 'E' ||
        keyPressed === 'r' || keyPressed === 'R')
            return true;
    return false;
}

function getSkillIndex(keyPressed) {
    if (keyPressed === 'q' || keyPressed === 'Q')
        return 0;
    else if (keyPressed === 'e' || keyPressed === 'E')
        return 1;
    else if (keyPressed === 'r' || keyPressed === 'R')
        return 2;
    else
        return -1;
};

export function spellPlayer(game, keyPressed, command) {

    state = game.state;
    game.notifyAll(command);

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[playerId];

    const skillIndex = getSkillIndex(keyPressed);

    const skillCompleteName = skillIndex >= 0 ? player.class.skills[skillIndex] : 'nothingSkills-nothing';
    const classNameAndSkillArray = skillCompleteName.split('-');

    command.skillCompleteName = skillCompleteName;

    const skillName = classNameAndSkillArray[1];

    const skillFunctionsBlue = state.allSkills['blueSideSkills'];
    const skillFunctionsRed = state.allSkills['redSideSkills'];

    const skillNothing = state.allSkills['nothingSkills'];

    let skillFunction;

    if (skillIndex < 0) {
        skillFunction = skillNothing[skillName];
    } else if (playerId === state.blueId) {
        skillFunction = skillFunctionsBlue[skillName];
    } else if (playerId === state.redId) {
        skillFunction = skillFunctionsRed[skillName];
    }

    if (player && skillFunction) {
        skillFunction(command);
    }

    return;
};