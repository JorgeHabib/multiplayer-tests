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