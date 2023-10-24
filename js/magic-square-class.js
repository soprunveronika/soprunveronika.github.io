let nextRotataion = Math.random() < 0.5;

class Magic {
    constructor(size = 7) {
        this.size = size;
        this.square = new Array(this.size).fill(0).map(() => new Array(this.size).fill(0));

        this.create();

        let rotations = Math.random() < 0.5;
        if (rotations) {
            this.rotate(0);
            this.rotate(1);
        }
        else {
            this.rotate(nextRotataion);
            nextRotataion = nextRotataion ? 0 : 1;
        }
    }
    create() {
        if (this.size % 2) {
            let pos = 0, num = 1, offset = (this.size - 1) / 2;
            let x, y;

            while (pos < this.size) {
                for(let i = 0; i < this.size; i ++) {
                    x = i + pos;
                    y = this.size - i - 1 + pos;

                    if (x < offset) x += this.size;
                    if (y < offset) y += this.size;
                    if (x > this.size + offset - 1) x -= this.size;
                    if (y > this.size + offset - 1) y -= this.size;

                    this.square[y - offset][x - offset] = num ++;
                }
                pos ++;
            }
        }

        else if (this.size == 4)
            this.square = [[7, 12, 1, 14], [2, 13, 8, 11], [16, 3, 10, 5], [9, 6, 15, 4]]
        else if (this.size == 6)
            this.square = [[27, 29, 2, 4, 13, 36], [9, 11, 20, 22, 31, 18], [32, 25, 7, 3, 21, 23], [14, 16, 34, 30, 12, 5], [28, 6, 15, 17, 26, 19], [1, 24, 33, 35, 8, 10]]
        else if (this.size == 8)
            this.square = [[64, 2, 3, 61, 60, 6, 7, 57], [9, 55, 54, 12, 13, 51, 50, 16], [17, 47, 46, 20, 21, 43, 42, 24], [40, 26, 27, 37, 36, 30, 31, 33], [32, 34, 35, 29, 28, 38, 39, 25], [41, 23, 22, 44, 45, 19, 18, 48], [49, 15, 14, 52, 53, 11, 10, 56], [8, 58, 59, 5, 4, 62, 63, 1]]
        else if (this.size == 10)
            this.square = [[100, 99, 93, 7, 5, 6, 4, 8, 92, 91], [11, 89, 88, 84, 16, 15, 17, 83, 82, 20], [30, 22, 78, 77, 75, 26, 74, 73, 29, 21], [61, 39, 33, 67, 66, 65, 64, 38, 32, 40], [60, 52, 48, 44, 56, 55, 47, 43, 49, 51], [50, 42, 53, 54, 46, 45, 57, 58, 59, 41], [31, 62, 63, 37, 36, 35, 34, 68, 69, 70], [71, 72, 28, 27, 25, 76, 24, 23, 79, 80], [81, 19, 18, 14, 85, 86, 87, 13, 12, 90], [10, 9, 3, 94, 95, 96, 97, 98, 2, 1]]
    }
    rotate(mode = 0) {
        if (mode)
            for (let i = 0; i < this.size - 1; i ++)
                for (let j = 0; j < this.size - i - 1; j ++)
                    [
                        this.square[i][j], this.square[this.size - j - 1][this.size - i - 1]] =
                        [this.square[this.size - j - 1][this.size - i - 1], this.square[i][j]
                        ]

        else
            for (let i = 1; i < this.size; i ++)
                for (let j = 0; j < i; j ++)
                    [this.square[i][j], this.square[j][i]] = [this.square[j][i], this.square[i][j]]
    }
}

class MagicOld {
    constructor(size = 3) {
        this.size = size;
        //numbers to fill (Ex. if matrix 3x3 contain num from 1 to 3)
        this.mst = [...Array(this.size * this.size)].map((v, i) => i + 1);
        // square is array which contains zeros
        this.square = Array(this.size).fill(0).map(() => Array(this.size).fill(0));
        this.create();
        console.log(this.square);
    }
    create() {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Заполняем магический квадрат
        this.square[0][0] = numbers[1];
        this.square[0][1] = numbers[8]; // 2 9 4
        this.square[0][2] = numbers[3]; // 7 5 3
        this.square[1][0] = numbers[6]; // 6 1 8
        this.square[1][1] = numbers[4];
        this.square[1][2] = numbers[2];
        this.square[2][0] = numbers[5];
        this.square[2][1] = numbers[0];
        this.square[2][2] = numbers[7];

        // Выполняем случайное вращение
        // let rotations = Math.floor(Math.random() * 4); // Случайное количество вращений (0-3)

        for (let i = 0; i < rotations; i++) {
            this.rotateCenter();
            this.rotateDiagonal();
        }
    }
    rotateCenter() {
        const moves = Math.floor(Math.random() * 4) * 2; // Random even number of moves (0, 2, 4, 6)

        for (let i = 0; i < moves; i += 1) {
            // Shift elements in a circular motion clockwise
            const temp = this.square[0][2];
            this.square[0][2] = this.square[0][1];
            this.square[0][1] = this.square[0][0];
            this.square[0][0] = this.square[1][0];
            this.square[1][0] = this.square[2][0];
            this.square[2][0] = this.square[2][1];
            this.square[2][1] = this.square[2][2];
            this.square[2][2] = this.square[1][2];
            this.square[1][2] = temp;
        }
    }
    rotateDiagonal() {
        // Выбираем случайную диагональ для вращения
        let diagonal = Math.random() < 0.5 ? "main" : "secondary";

        if (diagonal === "main") {
            // Поворот вокруг главной диагонали
            let temp = this.square[0][2];
            this.square[0][2] = this.square[2][0]; // 4=6
            this.square[2][0] = temp;

            temp = this.square[0][1];
            this.square[0][1] = this.square[1][0]; // 7=9
            this.square[1][0] = temp;

            temp = this.square[2][1];
            this.square[2][1] = this.square[1][2]; // 3=1
            this.square[1][2] = temp;
        } else {
            // Поворот вокруг побочной диагонали
            let temp = this.square[0][0];
            this.square[0][0] = this.square[2][2];// 8=2
            this.square[2][2] = temp;

            temp = this.square[0][1];
            this.square[0][1] = this.square[1][2];//3 = 9
            this.square[1][2] = temp;

            temp = this.square[2][1];
            this.square[2][1] = this.square[1][0];//1 = 7
            this.square[1][0] = temp;
        }
    }
}