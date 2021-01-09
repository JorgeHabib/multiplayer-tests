export function movementKeyPressed(key){
    if( key == 'W' || key == 'w' ||
        key == 'A' || key == 'a' ||
        key == 'S' || key == 's' ||
        key == 'D' || key == 'd' )
            return true;
    return false;
}

export function skillKeyPressed(key){
    if( key == 'Q' || key == 'q' ||
        key == 'E' || key == 'e' ||
        key == 'R' || key == 'r' )
            return true;
}

export default function createKeyboardListener(game, document, socket) {
    const state = {
        observers: []
    };

    document.addEventListener('keydown', handleKeyDown);

    function registerPlayerID(playerID) {
        state.playerId = playerID;
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
        game.movePlayer(game, command);
    } else if ( skillKeyPressed(keyPressed) ) {
        if (state.gameStarted) {
            command.type = 'abitily-used';
            game.playerSkill(game, command);
        }
    }
}