export const TWO_PI = 2 * Math.PI;

export function random() {
    return Math.random();
}

export function randomMax(max) {
    return Math.random() * max;
}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.random() * (max - min)) + min;
}

function randomRangeInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function mapNumber(n, x1, x2, y1, y2) {
    const sub1 = x2 - x1;
    const sub2 = y2 - y1;

    if (sub1 === 0 || sub2 === 0)
        return 0;

    n -= x2;
    n /= sub1;

    n *= sub2;
    n += y2;

    return n;
}

export function drawGrid(side, c, HEIGHT, WIDTH) {
    for (let i = 0; i < HEIGHT / side; i++) {
        c.beginPath()
        c.moveTo(0, side * i)
        c.lineTo(WIDTH, side * i)
        c.strokeStyle = '#DDD'
        c.stroke()
    }

    for (let i = 0; i < WIDTH / side; i++) {
        c.beginPath()
        c.moveTo(side * i, 0)
        c.lineTo(side * i, HEIGHT)
        c.strokeStyle = '#DDD'
        c.stroke()
    }
}

export function constrain(n, min, max) {
    if (n < min)
        return min;

    if (n > max)
        return max;

    return n;
}

export function getDistance(x1, y1, x2, y2) {
    const v1 = x2 - x1;
    const v2 = y2 - y1;

    return Math.sqrt(v1 * v1 + v2 * v2);
}

export function newChar() {
    let letter = (randomRangeInt(65, 126));

    if (letter === 123)
        letter = 32;

    if (letter === 124)
        letter = 33;

    if (letter === 125)
        letter = 46;

    return String.fromCharCode(letter);
}

export function power(base, exponent) {
    let result = 1;

    for (let i = 0; i < exponent; i++) {
        result *= base;
    }

    return result;
}