import { createInfo, createIcon, createButton } from './element_creation.js';
import updateStats from './update.js';

export function insertMenuArea(game, playerId, document) {
    const player = game.state.players[playerId];

    const myInfos = document.getElementById('myInfos');
    const enemyInfos = document.getElementById('enemyInfos');

    const statusBar = createInfo('statusBar');

    const hpBar = createInfo('hpBar');
    const hpSlide = createInfo('hpSlide');
    hpBar.appendChild(hpSlide);

    const manaBar = createInfo('manaBar');
    const manaSlide = createInfo('manaSlide');
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