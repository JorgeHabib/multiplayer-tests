export function handlePreparingMode(document, game) {
    let timer = game.state.timer;

    const ending = setInterval(function () {
        timer -= 1;

        if (timer < 0) {
            clearInterval(ending);
            let timerTable = document.getElementById('preparingTimer');
            timerTable.remove();
        } else {
            const insertingLocal = document.getElementById('myInfos');
            let timerTable = document.getElementById('preparingTimer');

            if (timerTable) {
                timerTable.innerHTML = timer;

                if (timer <= 5) {
                    timerTable.classList.add('preparingTimerRed');
                }
            } else {
                timerTable = document.createElement('div');
                timerTable.classList.add('preparingTimer');
                timerTable.id = 'preparingTimer';
                timerTable.innerHTML = timer;
                insertingLocal.appendChild(timerTable);
            }
        }
    }, 1000)
}