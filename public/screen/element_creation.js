export function createInfo(id){
    const info = document.createElement('div');
    info.id = id;
    info.classList.add(id);
    return info;
}

export function createIcon(id){
    const img = document.createElement('img');
    img.src = './imgs/Icons/' + id + '.png';
    img.classList.add(id);
    return img;
}

export function createButton(id){
    const button = document.createElement('button');
    button.id = id;
    button.classList.add(id);
    return button;
}

export function updateHealth(){
    const player = game.state.players[playerId];
        const enemy = game.state.players[enemyId];

        const lifeBar = document.getElementById('hpSlide');
        const width = player.life / player.class.life * 100;

        const lifeBarEnemy = document.getElementById('hpSlideEnemy');
        const widthEnemy = enemy.life / enemy.class.life * 100;

        lifeBar.innerHTML = `${player.life}/${player.totalLife}`;
        lifeBar.style.width = `${width}%`;
        lifeBarEnemy.style.width = `${widthEnemy}%`;
}