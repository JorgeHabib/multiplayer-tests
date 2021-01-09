export function handleReady(button, socket, game, playerID){
    if (!game.state.players[playerID].class)
    return;

    button.className = 'isReady';
    button.classList.remove('notReady');

    const player = game.state.players[playerId];

    if (player.blueSide) {
        const choosenClass = game.state.players[playerId].class;

        const command = {
            type: 'blue-side-ready',
            blueSide: true,
            redSide: false,
            playerId,
            choosenClass
        }

        socket.emit(command.type, command);
    } else if (player.redSide) {
        const choosenClass = game.state.players[playerId].class;

        const command = {
            type: 'red-side-ready',
            blueSide: false,
            redSide: true,
            playerId,
            choosenClass
        }
        socket.emit(command.type, command);
    }
}