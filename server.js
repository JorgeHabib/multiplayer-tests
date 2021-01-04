import express from 'express';
import http from 'http';
import createGame from './public/createGame.js';
import { getSkillObject } from './public/spells.js';
import socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

app.use(express.static('public'));

const game = createGame();

game.setServerSide(true);

game.subscribeObserver((command) => {
    console.log(`Emmiting ${command.type}`);
    sockets.emit(command.type, command);
})

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`Player connected: ${playerId}`);

    if (game.state.hasBlueSide) {
        if (!game.state.hasRedSide) {
            game.state.hasRedSide = true;

            const player = {
                playerId,
                blueSide: false,
                redSide: true,
                spect: false
            };

            game.addPlayer(player);
            console.log(`Player ${playerId} is on red side`);
        } else {
            if (game.state.gameStarted === true) {
                console.log('game-started')
                socket.emit('forceDisconnect');
            } else {
                const player = {
                    playerId,
                    spect: true,
                    blueSide: false,
                    redSide: false
                }

                game.addPlayer(player)
                console.log(`Player ${playerId} is on spec mode`);
            }
        }
    } else {
        game.state.hasBlueSide = true;

        const player = {
            playerId,
            redSide: false,
            blueSide: true,
            spect: false
        }

        game.addPlayer(player);
        console.log(`Player ${playerId} is on blue side`);
    }

    socket.emit('setup', game.state);

    socket.on('keyboard-event', (command) => {
        command.playerId = playerId;
        game.handleKeyboardEventSERVER(command);
    });

    socket.on('disconnect', () => {
        game.removePlayer({ playerId });
    });

    socket.on('blue-side-ready', (command) => {
        game.setReady(command);

        if (game.state.gameStarted) {
            const blueSideChar = `${game.state.players[game.state.blueId].class.className}Skills`;
            const redSideChar = `${game.state.players[game.state.redId].class.className}Skills`;
            const skills = getSkillObject(game, blueSideChar, redSideChar);
            game.setupSkills(skills);
        }
    });

    socket.on('red-side-ready', (command) => {
        game.setReady(command);

        if (game.state.gameStarted) {
            const blueSideChar = `${game.state.players[game.state.blueId].class.className}Skills`;
            const redSideChar = `${game.state.players[game.state.redId].class.className}Skills`;
            const skills = getSkillObject(game, blueSideChar, redSideChar);
            game.setupSkills(skills);
        }
    })

})

server.listen(3030, () => {
    console.log('> Server listening on port: 3030');
})