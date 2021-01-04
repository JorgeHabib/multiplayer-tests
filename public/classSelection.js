import { Mage, Tank, God } from './classes.js';

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