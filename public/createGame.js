import { movementKeyPressed, movePlayer } from './movement.js';
import { spellKeyPressed, spellPlayer, handleSkillShoots, collisionSkillPlayer, collisionSkillWall, collisionSkillWall } from './spells.js';

export default function createGame() {
    const state = {
        players: {},
        blueId: '',
        redId: '',
        screen: {
            height: 1680,
            width: 1680
        },
        serverSide: false,
        mapMatrix: [],
        wallsArray: [],
        hasBlueSide: false,
        hasRedSide: false,
        blueSideReady: false,
        redSideReady: false,
        gameStarted: false,
        fightMode: false,
        timer: 0,
        intervalVal: 0,
        timer: 10,
        allSkills: {},
        skillShoots: []
    };

    const observers = [];
    setupMapMatrix();

    function setupSkills(newSkills) {
        Object.assign(state.allSkills, newSkills);
    }

    function setupMapMatrix() {
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

    function setServerSide(bool) {
        state.serverSide = bool;
    }

    function setState(newState) {
        Object.assign(state, newState);
    }

    function addPlayer(command) {
        const { playerId, blueSide, redSide, spect } = command;

        let playerX = 0;
        let playerY = 0;

        if (!spect) {
            const x = blueSide ? 10 : 1550;
            const y = blueSide ? 1550 : 10;

            playerX = x;
            playerY = y;
        }

        state.players[playerId] = { x: playerX, y: playerY, blueSide, redSide, spect };

        if (blueSide) {
            state.blueId = playerId;
            state.myId = playerId;
        }

        if (redSide) {
            state.redId = playerId;
            state.myId = playerId;
        }

        if (!spect) {
            notifyAll({
                type: 'add-player',
                playerId,
                playerX,
                playerY,
                spect: command.spect,
                blueSide,
                redSide
            })
        }
    }

    function subscribeObserver(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command);
        }
    }

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
        moveFunction(player);
    }

    function handleKeyboardEventSERVER(command) {
        const keyPressed = command.keyPressed;

        if ( movementKeyPressed(keyPressed) ) {
            command.type = 'controll-player';
            acceptedMoves = movePlayer(this, command);
        }

        else if ( spellKeyPressed(keyPressed) ) {
            if (state.gameStarted) {
                command.type = 'abitily-used';
                spellPlayer(this, keyPressed, command);
            }
        }
    }

    function removePlayer(command) {
        const { playerId } = command;

        delete state.players[playerId];

        notifyAll({
            type: 'remove-player',
            playerId
        })
    }

    function setReady(command) {
        const { playerId, choosenClass } = command;

        state.players[playerId].class = choosenClass;
        if (command.blueSide) {
            state.blueSideReady = true;
            if (state.redSideReady) {
                state.gameStarted = true;
                gameStarted();
            }

            notifyAll(command);
        } else if (command.redSide) {
            state.redSideReady = true;
            if (state.blueSideReady) {
                state.gameStarted = true;
                gameStarted();
            }

            notifyAll(command);
        }
    }

    function gameStarted() {
        console.log('START GAME');

        state.players[state.blueId].life = state.players[state.blueId].class.life - 200;
        state.players[state.blueId].totalLife = state.players[state.blueId].class.totalLife;
        state.players[state.blueId].mana = state.players[state.blueId].class.initialMana;
        state.players[state.blueId].totalMana = state.players[state.blueId].class.totalMana;
        state.players[state.blueId].damage = state.players[state.blueId].class.damage;
        state.players[state.blueId].gold = state.players[state.blueId].class.initialGold;
        state.players[state.blueId].armor = state.players[state.blueId].class.armor;

        const skillArrayBlue = state.players[state.blueId].class.skills;
        const nSkillsBlue = skillArrayBlue.length;
        const coolDownArrayBlue = [];

        for (let i = 0; i < nSkillsBlue; i++)
            coolDownArrayBlue.push(0);

        state.players[state.blueId].coolDown = coolDownArrayBlue;

        state.players[state.redId].life = state.players[state.redId].class.life - 200;
        state.players[state.redId].totalLife = state.players[state.redId].class.totalLife;
        state.players[state.redId].mana = state.players[state.redId].class.initialMana;
        state.players[state.redId].totalMana = state.players[state.redId].class.totalMana;
        state.players[state.redId].damage = state.players[state.redId].class.damage;
        state.players[state.redId].gold = state.players[state.redId].class.initialGold;
        state.players[state.redId].armor = state.players[state.redId].class.armor;

        const skillArrayRed = state.players[state.redId].class.skills;
        const nSkillsRed = skillArrayRed.length;
        const coolDownArrayRed = [];

        for (let i = 0; i < nSkillsRed; i++)
            coolDownArrayRed.push(0);

        state.players[state.redId].coolDown = coolDownArrayRed;

        state.players[state.blueId].x = 10;
        state.players[state.blueId].y = 1550;

        state.players[state.redId].x = 1550;
        state.players[state.redId].y = 10;

        preparationMode();
    }

    function preparationMode() {
        const time = state.timer;
        state.timer = time;

        state.intervalVal = setInterval(function () {
            state.timer -= 1;
            if (state.timer < 0) {
                clearInterval(state.intervalVal);
                startFightMode();
            }
        }, 1000);
    }

    function startFightMode() {
        console.log('Starting fight mode');
        state.wallsArray.shift();

        for (let i = 0; i < state.mapMatrix.length; i++) {
            state.mapMatrix[i][i] = 0;
        }
    }

    return {
        state,
        movePlayer,
        subscribeObserver,
        addPlayer,
        removePlayer,
        setState,
        setReady,
        gameStarted,
        preparationMode,
        subscribeObserver,
        spellPlayer,
        setupSkills,
        notifyAll,
        handleKeyboardEventSERVER,
        handleSkillShoots,
        setServerSide
    };

}