import { createInfo, createIcon, createButton } from "./interface";

export function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
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
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId);
    })
}

export function insertMenuArea(game, playerId, document) {
    const player = game.state.players[playerId];

    const myInfos = document.getElementById('myInfos');
    const enemyInfos = document.getElementById('enemyInfos');

    const statusBar = document.createElement('div');
    statusBar.id = 'statusBar';
    statusBar.classList.add('statusBar');

    const hpBar = document.createElement('div');
    hpBar.classList.add('hpBar');
    const hpSlide = document.createElement('div');
    hpSlide.id = 'hpSlide';
    hpSlide.classList.add('hpSlide');
    hpBar.appendChild(hpSlide);

    const manaBar = document.createElement('div');
    manaBar.id = 'manaBar';
    manaBar.classList.add('manaBar');
    const manaSlide = document.createElement('div');
    manaSlide.id = 'manaSlide';
    manaSlide.classList.add('manaSlide');
    manaBar.appendChild(manaSlide);


    let enemyId;
    let enemy;

    if (playerId === game.state.blueId) {
        enemyId = game.state.redId;
        enemy = game.state.players[enemyId];
    } else {
        enemyId = game.state.blueId;
        enemy = game.state.players[enemyId];
    }

    const statusBarEnemy = createInfo('statusBarEnemy');

    const hpBarEnemy = createInfo('hpBarEnemy');
    const hpSlideEnemy = createInfo('hpSlideEnemy');
    hpBarEnemy.appendChild(hpSlideEnemy);

    const manaBarEnemy = createInfo('manaBarEnemy');
    const manaSlideEnemy = createInfo('manaSlideEnemy');
    manaBarEnemy.appendChild(manaSlideEnemy);

    const inventory = createInfo('inventory');
    const stats = creteInfo('stats');
    const statsPlace = createInfo('statsPlace');

    const goldBox = createInfo('goldBox');
    const goldIcon = createIcon('goldIcon');
    const goldValue = createInfo('goldValue');
    goldValue.innerHTML = player.gold;
    goldBox.appendChild(goldIcon);
    goldBox.appendChild(goldValue);

    const damageBox = createInfo('damageBox');
    const damageIcon = createIcon('damageIcon');
    const damageValue = createInfo('damageValue');
    damageValue.innerHTML = player.damage;
    damageBox.appendChild(damageIcon);
    damageBox.appendChild(damageValue);

    const armorBox = createInfo('armorBox');
    const armorIcon = createIcon('armorIcon');
    const armorValue = createInfo(armorValue);
    armorValue.innerHTML = player.armor;
    armorBox.appendChild(armorIcon);
    armorBox.appendChild(armorValue);

    statsPlace.appendChild(damageBox);
    statsPlace.appendChild(armorBox);
    statsPlace.appendChild(goldBox);

    const rollButton = createButton('rollButton');
    rollButton.onclick = handleRoll;
    rollButton.innerHTML = '?';

    stats.appendChild(statsPlace);
    stats.appendChild(rollButton);

    const store = createInfo('store');

    const skills = createInfo('skills');

    player.class.skills.forEach((skill) => {
        const container = document.createElement('div');
        container.classList.add('containerSkills');

        const appended = document.createElement('img');
        appended.src = `./imgs/Skills/${skill}.png`;
        appended.id = `${skill}`;
        appended.classList.add('skillBox');
        appended.classList.add(`${skill}`);

        const appendedText = document.createElement('div');
        appendedText.classList.add('appendedText');
        appendedText.id = `${skill}AppendedText`;

        container.appendChild(appendedText);
        container.appendChild(appended);

        skills.appendChild(container);
    })


    const buildings = createInfo('buildings');

    const inventoryEnemy = createInfo('inventoryEnemy');
    const statsEnemy = createInfo('statsEnemy');
    const storeEnemy = createInfo('storeEnemy');
    const buildingsEnemy = createInfo('buildingsEnemy');

    statusBar.appendChild(hpBar);
    statusBar.appendChild(manaBar);
    statusBar.appendChild(inventory);
    statusBar.appendChild(stats);
    statusBar.appendChild(store);
    statusBar.appendChild(skills);

    statusBarEnemy.appendChild(hpBarEnemy);
    statusBarEnemy.appendChild(manaBarEnemy);
    statusBarEnemy.appendChild(buildings);

    myInfos.appendChild(statusBar);
    enemyInfos.appendChild(statusBarEnemy);

    updateStats(game, document, playerId, enemyId);
}

export function createUpdate() {
    function updateLifeBar(game, document, playerId, enemyId) {
        const player = game.state.players[playerId];
        const enemy = game.state.players[enemyId];

        const lifeBar = document.getElementById('hpSlide');
        const width = player.life / player.class.life * 100;

        const lifeBarEnemy = document.getElementById('hpSlideEnemy');
        const widthEnemy = enemy.life / enemy.class.life * 100;

        lifeBar.innerHTML = `${player.life}/${player.totalLife}`;
        lifeBar.style.width = `${width}%`;
        lifeBarEnemy.style.width = `${widthEnemy}%`;
    };

    function updateManaBar(game, document, playerId, enemyId) {
        const player = game.state.players[playerId];
        const enemy = game.state.players[enemyId];

        const manaBar = document.getElementById('manaSlide');
        const width = player.mana / player.totalMana * 100;

        const manaBarEnemy = document.getElementById('manaSlideEnemy');
        const widthEnemy = enemy.mana / enemy.totalMana * 100;

        manaBar.innerHTML = `${player.mana}/${player.totalMana}`;
        manaBar.style.width = `${width}%`;
        manaBarEnemy.style.width = `${widthEnemy}%`;
    };

    return {
        updateLifeBar,
        updateManaBar
    };
}

export function updateStats(game, document, playerId, enemyId) {
    const updateObj = createUpdate(game, document, playerId);

    updateObj.updateLifeBar(game, document, playerId, enemyId);
    updateObj.updateManaBar(game, document, playerId, enemyId);
}

function handleRoll() {
    console.log('It works');
}

export function loadCoolDownSkills(game, document, playerId) {
    const className = `${game.state.players[playerId].class.className}Skills-`;
    const coolDownArray = game.state.players[playerId].coolDown;
    const numOfSkills = coolDownArray.length;
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

            if (coolDownArray[i]) {
                if (turnDark[i]) {
                    turnLight[i] = true;
                    skillBox.classList.add('onCoolDown');
                    turnDark[i] = false;
                }

                const skillBoxText = document.getElementById(`${className}${skillsKeys[i]}AppendedText`);
                skillBoxText.innerHTML = coolDownArray[i];

            } else {
                if (turnLight[i]) {
                    turnDark[i] = true;

                    skillBox.classList.remove('onCoolDown');
                    const skillBoxText = document.getElementById(`${className}${skillsKeys[i]}AppendedText`);
                    skillBoxText.innerHTML = '';

                    turnLight[i] = false;
                }

            }
        }
    }, 250);
}