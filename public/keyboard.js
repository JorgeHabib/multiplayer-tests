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