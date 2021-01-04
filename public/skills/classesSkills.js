import { heal, reduceMana, initiateCooldownDrop } from './skills.js';
import { throwSkillShoot } from './skillshots.js';

export const nothingSkills = {
    nothing: function () {
        console.log('Not a Skill');
    }
};

export const MageSkills = {
    Q: function (command) {
        const hasMana = reduceMana(game, command, 0);

        if (!hasMana) {
            return;
        }

        if (game.state.players[command.playerId].coolDown[0] === 0) {

            throwSkillShoot(command, 100, 10, 'regular', 10);

            game.state.players[command.playerId].coolDown[0] = game.state.players[command.playerId].class.coolDown[0];
            initiateCooldownDrop(game, command, 0);
        }
    },

    E: function (command) {
        const hasMana = reduceMana(game, command, 1);

        if (!hasMana) {
            return;
        }

        if (game.state.players[command.playerId].coolDown[1] === 0) {

            heal(game, command, 100);

            game.state.players[command.playerId].coolDown[1] = game.state.players[command.playerId].class.coolDown[1];
            initiateCooldownDrop(game, command, 1);
        }
    },

    R: function (command) {
        if (game.state.players[command.playerId].coolDown[2] === 0) {

            game.state.players[command.playerId].coolDown[2] = game.state.players[command.playerId].class.coolDown[2];
            initiateCooldownDrop(game, command, 2);
        }
    },
};