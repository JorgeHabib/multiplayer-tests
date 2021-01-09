import { setupSkills, setupMapMatrix, setServerSide, setState, setupPlayer } from './setup.js';
import handleKeyboardEventSERVER from '../keyboard.js';
import { playerSkill, handleSkillShoots} from '../skills/skillshot.js';
import movePlayer from './movement.js';

export default function createGame() {
    const state = {
        players: {},
        blueID: '',
        redID: '',
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

    function addPlayer(command) {
        const { playerID, blueSide, redSide, spect } = command;

        let playerX = 0;
        let playerY = 0;

        if (!spect) {
            const x = blueSide ? 10 : 1550;
            const y = blueSide ? 1550 : 10;

            playerX = x;
            playerY = y;
        }

        state.players[playerID] = { x: playerX, y: playerY, blueSide, redSide, spect };

        if (blueSide) {
            state.blueID = playerID;
            state.myID = playerID;
        }

        if (redSide) {
            state.redID = playerID;
            state.myID = playerID;
        }

        if (!spect) {
            notifyAll({
                type: 'add-player',
                playerID,
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

    function removePlayer(command) {
        const { playerID } = command;

        delete state.players[playerID];

        notifyAll({
            type: 'remove-player',
            playerID
        })
    }

    function setReady(command) {
        const { playerID, choosenClass } = command;

        state.players[playerID].class = choosenClass;
        
        if (command.blueSide) {
            state.blueSideReady = true;
            if (state.redSideReady) {
                state.gameStarted = true;
                gameStarted();
            }

        } else if (command.redSide) {
            state.redSideReady = true;
            if (state.blueSideReady) {
                state.gameStarted = true;
                gameStarted();
            }

        }

        notifyAll(command);
    }

    function gameStarted() {
        console.log('START GAME');

        state.players[state.blueID] = setupPLayer(state.players[state.blueID]);
        state.players[state.redID] = setupPlayer(state.players[state.redID]);

        state.players[state.blueID].x = 10;
        state.players[state.blueID].y = 1550;

        state.players[state.redID].x = 1550;
        state.players[state.redID].y = 10;

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
        playerSkill,
        setupSkills,
        notifyAll,
        handleKeyboardEventSERVER,
        handleSkillShoots,
        setServerSide
    };
}