export function renderScreen(screen, game, requestAnimationFrame, currentPlayerID) {
    const c = screen.getContext('2d');

    c.fillStyle = 'white';
    c.clearRect(0, 0, game.state.screen.height, game.state.screen.width);

    const blueSidePlayer = game.state.blueId ? game.state.players[game.state.blueId] : 0;
    const redSidePlayer = game.state.redId ? game.state.players[game.state.redId] : 0;

    if (game.state.gameStarted) {
        const blueSideColor = game.state.players[game.state.blueId].class.color;
        const blueSideSize = game.state.players[game.state.blueId].class.side;

        const redSideColor = game.state.players[game.state.redId].class.color;
        const redSideSize = game.state.players[game.state.redId].class.side;

        c.fillStyle = blueSideColor;
        c.fillRect(blueSidePlayer.x, blueSidePlayer.y, blueSideSize, blueSideSize);

        c.fillStyle = redSideColor;
        c.fillRect(redSidePlayer.x, redSidePlayer.y, redSideSize, redSideSize);
    } else {
        const blueSideColor = 'rgb(0, 0, 200)';
        const redSideColor = 'rgb(200, 0, 0)';

        if (blueSidePlayer) {
            c.fillStyle = blueSideColor;
            c.fillRect(blueSidePlayer.x, blueSidePlayer.y, 10, 10);
        }

        if (redSidePlayer) {
            c.fillStyle = redSideColor;
            c.fillRect(redSidePlayer.x, redSidePlayer.y, 10, 10);
        }
    }

    game.state.wallsArray.forEach(wall => {
        c.fillStyle = 'black';
        c.beginPath();
        c.moveTo(wall.xInit, wall.yInit);
        c.lineTo(wall.xEnd, wall.yEnd);
        c.stroke();
    })

    game.state.skillShoots.forEach(skill => {
        c.fillStyle = 'blue';
        c.beginPath();
        c.arc(skill.x, skill.y, skill.radius, 0, Math.PI * 2, false);
        c.fill();
    })

    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerID);
    })
}