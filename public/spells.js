import moveSkillShootRegular from './movement.js';
import { nothingSkills, MageSkills } from './skills.js';

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

    const state = game.state;
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
}

export function handleSkillShoots(game, objSkill, command) {
    const state = game.state;
    const player = state.players[command.playerId];

    if (objSkill.type === 'regular') {
        const skillShootObject = {
            x: player.x,
            y: player.y,
            xi: player.x,
            yi: player.y,
            xf: command.mouseX,
            yf: command.mouseY,
            radius: objSkill.radius,
        }

        const velVector = {
            x: skillShootObject.xf - skillShootObject.xi,
            y: skillShootObject.yf - skillShootObject.yi
        }

        let vectorModule = velVector.x * velVector.x + velVector.y * velVector.y;
        vectorModule = Math.sqrt(vectorModule);

        velVector.x /= vectorModule;
        velVector.y /= vectorModule;

        state.skillShoots.push(skillShootObject);
        const index = state.skillShoots.length - 1;
        moveSkillShootRegular(game, objSkill, velVector, command, index);
    }
}

export function collisionSkillWall(skill, command) {
    command.type = 'damage-to-wall';
    //VERIFICAR CAMINHO A SER SEGUIDO PELA SKILL
    if (state.mapMatrix[Math.floor(skill.x)][Math.floor(skill.y)]) {
        return true;
    }

    return false;
}

export function collisionSkillPlayer(skill, command) {
    command.type = 'damage-to-player';
    return false;
}

export function collisionSkillStructure(skill, command) {
    command.type = 'damage-to-structure';
    return false;
}

export function getSkillObject(game, blueSideChar, redSideChar) {
    function heal(game, command, ammount) {
        game.state.players[command.playerId].life += ammount;

        if (game.state.players[command.playerId].life > game.state.players[command.playerId].totalLife) {
            game.state.players[command.playerId].life = game.state.players[command.playerId].totalLife;
        }
    }

    function throwSkillShoot(command, damage, velocity, type, radius) {
        const objShoot = {
            type,
            damage,
            velocity,
            radius
        }

        game.handleSkillShoots(game, objShoot, command);
    }

    const skills = {
        nothingSkills,
        MageSkills,
    }

    const returnedObj = {
        blueSideSkills: skills[blueSideChar],
        redSideSkills: skills[redSideChar],
        nothingSkills
    }

    return returnedObj;
}