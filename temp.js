function createMagicSquare(n) {
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));
    let pos = 0, num = 1, offset = (n - 1) / 2;
    let x, y;

    while (pos < n) {
        for(let i = 0; i < n; i ++) {
            x = i + pos;
            y = n - i - 1 + pos;

            if (x < offset) x += n;
            if (y < offset) y += n;
            if (x > n + offset - 1) x -= n;
            if (y > n + offset - 1) y -= n;

            matrix[y - offset][x - offset] = num ++;
        }
        pos ++;
    }
    return matrix;
}

// let A = [
//     [ 3, 16, 9, 22, 15 ],
//     [ 20, 8, 21, 14, 2 ],
//     [ 7, 25, 13, 1, 19 ],
//     [ 24, 12, 5, 18, 6 ],
//     [ 11, 4, 17, 10, 23 ]
// ]

let A = [[7, 12, 1, 14], [2, 13, 8, 11], [16, 3, 10, 5], [9, 6, 15, 4]];

function get(from, to) {
    return (Math.round(Math.random() * (to - from)) + from)
};

console.log(A);

// 0 - Оборот по основній діагоналі, 1 - по побічній
function rotateByDiagonal(mode = 0) {
    let n = A.length;

    if (mode)
        for (let i = 0; i < n - 1; i ++)
            for (let j = 0; j < n - i - 1; j ++)
                [A[i][j],A[n - j - 1][n - i - 1]] = [A[n - j - 1][n - i - 1], A[i][j]]

    else
        for (let i = 1; i < n; i ++)
            for (let j = 0; j < i; j ++)
                [A[i][j], A[j][i]] = [A[j][i], A[i][j]]
}

rotateByDiagonal(0);
rotateByDiagonal(1);
console.log(A);

// let magicSquare = createMagicSquare(4);
// for (let i = 0; i < magicSquare.length; i++) console.log(magicSquare[i].join(' '));