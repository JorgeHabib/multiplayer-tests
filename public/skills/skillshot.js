import MageSkills from '../classes/skills/mage.js';

function getSkillIndex(keyPressed) {
    if (keyPressed === 'q' || keyPressed === 'Q')
        return 0;
    else if (keyPressed === 'e' || keyPressed === 'E')
        return 1;
    else if (keyPressed === 'r' || keyPressed === 'R')
        return 2;
    else
        return -1;
}

export function playerSkill(command) {
    notifyAll(command);

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

function moveSkillShootRegular(game, objSkill, velVector, command, index) {
    velVector.x *= objSkill.velocity;
    velVector.y *= objSkill.velocity;

    const skillLoop = setInterval(function () {
        const skill = state.skillShoots[index];

        skill.x += velVector.x;
        skill.y += velVector.y;

        if (collisionSkillWall(skill, command) || 
            collisionSkillStructure(skill, command) || 
            collisionSkillPlayer(skill, command)) {
                clearInterval(skillLoop);
                game.state.skillShoots.splice(index, 1);
                console.log('HIT PLAYER');
        }
    }, 3);
}

export function handleSkillShoots(objSkill, command) {
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
        moveSkillShootRegular(objSkill, velVector, command, index);
    }
}


export function collisionSkillPlayer(skill, command) {
    command.type = 'damage-to-player';
    return false;
}

export function collisionSkillStructure(skill, command) {
    command.type = 'damage-to-structure';
    return false;
}

export function collisionSkillWall(skill, command) {
    command.type = 'damage-to-wall';
    //VERIFICAR CAMINHO A SER SEGUIDO PELA SKILL
    if (state.mapMatrix[Math.floor(skill.x)][Math.floor(skill.y)]) {
        return true;
    }

    return false;
}


export function createSkillshot(game, blueSideChar, redSideChar) {
    const nothingSkills = {
        nothing: function () {
            console.log('Not a Skill');
        }
    }

    function throwSkillshot(command, damage, velocity, type, radius){
        const skillshot = {
            type,
            damage,
            velocity,
            radius
        }
    
        game.handleSkillShoots(skillshot, command);
    }

    const skills = {
        nothingSkills,
        MageSkills,
    }

    const skillshot = {
        blueSideSkills: skills[blueSideChar],
        redSideSkills: skills[redSideChar],
        nothingSkills
    }

    return skillshot;
}