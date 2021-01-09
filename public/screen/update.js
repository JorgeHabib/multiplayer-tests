function updateHealth(game, document, playerID, enemyID){
    const player = game.state.players[playerID];
        const enemy = game.state.players[enemyID];

        const lifeBar = document.getElementById('hpSlide');
        const width = player.life / player.class.life * 100;

        const lifeBarEnemy = document.getElementById('hpSlideEnemy');
        const widthEnemy = enemy.life / enemy.class.life * 100;

        lifeBar.innerHTML = `${player.life}/${player.totalLife}`;
        lifeBar.style.width = `${width}%`;
        lifeBarEnemy.style.width = `${widthEnemy}%`;
}

function updateMana(game, document, playerID, enemyID){
    const player = game.state.players[playerID];
    const enemy = game.state.players[enemyID];

    const manaBar = document.getElementById('manaSlide');
    const width = player.mana / player.totalMana * 100;

    const manaBarEnemy = document.getElementById('manaSlideEnemy');
    const widthEnemy = enemy.mana / enemy.totalMana * 100;

    manaBar.innerHTML = `${player.mana}/${player.totalMana}`;
    manaBar.style.width = `${width}%`;
    manaBarEnemy.style.width = `${widthEnemy}%`;
}

export function updateStats(game, document, playerID, enemyID){
    updateHealth(game, document, playerID, enemyID);
    updateMana(game, document, playerID, enemyID);
}

export function updateCooldowns(game, document, playerID){
    const className = `${game.state.players[playerID].class.className}Skills-`;
    const cooldownArray = game.state.players[playerID].cooldown;
    const numOfSkills = cooldownArray.length;
    const skillsKeys = ['Q', 'E', 'R'];

    let turnDark = [];
    let turnLight = [];

    for (let i = 0; i < numOfSkills; i++) {
        turnLight.push(true);
        turnDark.push(true);
    }

    setInterval(function () {
        for (let i = 0; i < numOfSkills; i++) {
            const skillBox = document.getElementById(`${className}${skillsKeys[i]}`);

            if (cooldownArray[i]) {
                if (turnDark[i]) {
                    turnLight[i] = true;
                    skillBox.classList.add('onCooldown');
                    turnDark[i] = false;
                }

                const skillBoxText = document.getElementById(`${className}${skillsKeys[i]}AppendedText`);
                skillBoxText.innerHTML = coolDownArray[i];

            } else {
                if (turnLight[i]) {
                    turnDark[i] = true;

                    skillBox.classList.remove('onCooldown');
                    const skillBoxText = document.getElementById(`${className}${skillsKeys[i]}AppendedText`);
                    skillBoxText.innerHTML = '';

                    turnLight[i] = false;
                }

            }
        }
    }, 250);
}