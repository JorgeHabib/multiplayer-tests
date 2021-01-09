import { Mage, Tank, God } from './classes.js';


function classSelection(divClasses, currentClass, game, playerID){
    game.state.players[playerID].class = currentClass;

    for (const childNode of divClasses.childNodes) {
        if (childNode.innerHTML === currentClass.className) {
            childNode.classList.add('classSelected');
        } else {
            childNode.classList.remove('classSelected');
        }
    }
}

export function fitClasses(divClasses, game, playerID){

    const classes = {
        mage : new Mage(),
        tank : new Tank(), 
        god : new God()
    };

    const optionClasses = [];
    const indexOne = 0;

    let indexTwo = Math.floor(Math.random() * classes.length);
    while (indexTwo === indexOne) {
        indexTwo = Math.floor(Math.random() * classes.length);
    }

    optionsOfClasses.push(classes[indexTwo]);

    let indexThree = Math.floor(Math.random() * classes.length);
    while (indexThree === indexOne || indexThree === indexTwo) {
        indexThree = Math.floor(Math.random() * classes.length);
    }

    for (const currentClass of optionsOfClasses) {
        const actualDiv = document.createElement('div');
        actualDiv.innerHTML = currentClass.className;
        actualDiv.classList.add(currentClass.className);
        actualDiv.classList.add('classBoxe');
        actualDiv.addEventListener("click", () => classSelection(divClasses, currentClass, game, playerID));

        divClasses.appendChild(actualDiv);
    }
}
