function movementKeyPressed(keyPressed){
    if (keyPressed === 'w' || keyPressed === 'W' ||
        keyPressed === 's' || keyPressed === 'S' ||
        keyPressed === 'a' || keyPressed === 'A' ||
        keyPressed === 'd' || keyPressed === 'D')
            return true;

    return false;
}

function skillKeyPressed(keyPressed){
    if (keyPressed === 'q' || keyPressed === 'Q' ||
        keyPressed === 'e' || keyPressed === 'E' ||
        keyPressed === 'r' || keyPressed === 'R')
            return true;
    return false;
}

export default function createKeyboardListener(game, document, socket) {
    const state = {
        observers: []
    };

    document.addEventListener('keydown', handleKeyDown);

    function registerPlayerId(playerId) {
        state.playerId = playerId;
    };

    function handleKeyDown(e) {
        const keyPressed = e.key;
        const mouseX = game.state.players[state.playerId].mouse.mouseX;
        const mouseY = game.state.players[state.playerId].mouse.mouseY;

        const command = {
            type: 'keyboard-event',
            playerId: state.playerId,
            keyPressed,
            mouseX,
            mouseY
        };

        notifyAll(command);
    };

    function subscribeObserver(observerFunction) {
        state.observers.push(observerFunction);
    };

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    return {
        registerPlayerId,
        subscribeObserver
    }
}

export function handleKeyboardEventSERVER(game, command) {
    const keyPressed = command.keyPressed;

    if ( movementKeyPressed(keyPressed) ) {
        command.type = 'controll-player';
        acceptedMoves = movePlayer(game, command);
    }

    else if ( skillKeyPressed(keyPressed) ) {
        if (state.gameStarted) {
            command.type = 'abitily-used';
            skillPlayer(game, keyPressed, command);
        }
    }
}