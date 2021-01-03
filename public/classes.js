import { Mage, Tank, God } from './entity.js';

export function Classes() {
    const classes = [
        new Mage(),
        new Tank(),
        new God()
    ];
    
    return classes;
}

export function fitClasses(divClasses, game, playerId) {
    const classes = Classes();
    const optionsOfClasses = [];

    //const indexOne = Math.floor(Math.random() * classes.length);

    const indexOne = 0;

    optionsOfClasses.push(classes[indexOne]);

    let indexTwo = Math.floor(Math.random() * classes.length);
    while (indexTwo === indexOne) {
        indexTwo = Math.floor(Math.random() * classes.length);
    }

    optionsOfClasses.push(classes[indexTwo]);

    let indexThree = Math.floor(Math.random() * classes.length);
    while (indexThree === indexOne || indexThree === indexTwo) {
        indexThree = Math.floor(Math.random() * classes.length);
    }

    optionsOfClasses.push(classes[indexThree]);

    for (const currentClass of optionsOfClasses) {
        const actualDiv = document.createElement('div');
        actualDiv.innerHTML = currentClass.className;
        actualDiv.classList.add(currentClass.className);
        actualDiv.classList.add('classBoxe');
        actualDiv.addEventListener("click", () => handleSelectClass(divClasses, currentClass, game, playerId));

        divClasses.appendChild(actualDiv);
    }
}

function handleSelectClass(divClasses, currentClass, game, playerId) {
    game.state.players[playerId].class = currentClass;

    for (const childNode of divClasses.childNodes) {
        if (childNode.innerHTML === currentClass.className) {
            childNode.classList.add('classSelected');
        } else {
            childNode.classList.remove('classSelected');
        }
    }
}

export function getSkillObject(game, blueSideChar, redSideChar) {
    const nothingSkills = {
        nothing: function () {
            console.log('Not a Skill');
        }
    };

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

        game.handleSkillShoots(objShoot, command);
    }

    const MageSkills = {
        Q: function (command) {
            const hasMana = reduceMana(game, command, 0);

            if (!hasMana) {
                return;
            }

            if (game.state.players[command.playerId].coolDown[0] === 0) {

                throwSkillShoot(command, 100, 10, 'regular', 10);

                game.state.players[command.playerId].coolDown[0] = game.state.players[command.playerId].class.coolDown[0];
                initiateCoolDownDrop(game, command, 0);
            }
        },

        E: function (command) {
            const hasMana = reduceMana(game, command, 1);

            if (!hasMana) {
                return;
            }

            if (game.state.players[command.playerId].coolDown[1] === 0) {

                heal(game, command, 100);

                game.state.players[command.playerId].coolDown[1] = game.state.players[command.playerId].class.coolDown[1];
                initiateCoolDownDrop(game, command, 1);
            }
        },

        R: function (command) {
            if (game.state.players[command.playerId].coolDown[2] === 0) {

                game.state.players[command.playerId].coolDown[2] = game.state.players[command.playerId].class.coolDown[2];
                initiateCoolDownDrop(game, command, 2);
            }
        },
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

function reduceMana(game, command, skillId) {
    if (game.state.players[command.playerId].mana >= game.state.players[command.playerId].class.skillsManaCost[skillId]) {
        game.state.players[command.playerId].mana -= game.state.players[command.playerId].class.skillsManaCost[skillId];
        return true;
    } else {
        return false;
    }
}

function initiateCoolDownDrop(game, command, skillId) {
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