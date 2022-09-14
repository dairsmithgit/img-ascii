const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const image1 = new Image();
image1.src = 'images/railway1.jpeg';

// ascii class and private class fields
class AsciiEffect {
    #imageCellArray = [];
    #symbols = [];
    #pixels = [];
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
        console.log(this.#pixels.data);
    }

    // averageColorValue passed in as acv
    #convertToSymbol(acv) {
        if (acv > 250) return '\u003A'; // :
        else if (acv < 240) return '\u005B'; // [
        else if (acv < 230) return '\u005D'; // ]
        else if (acv < 220) return '*'; //
        else if (acv < 210) return '^'; //
        else if (acv < 200) return '/'; //
        else if (acv < 190) return '%'; //
        else if (acv < 180) return '_'; //
        else if (acv < 170) return '.'; //
        else if (acv < 160) return '>'; //
        else if (acv < 150) return 'L'; //
        else if (acv < 140) return ';'; //
        else if (acv < 130) return '0'; //
        else if (acv < 120) return 'U'; //
        else if (acv < 110) return 'E'; //
        else if (acv < 100) return 'G'; //
        else if (acv < 90) return 'M'; //
        else if (acv < 80) return 'A'; //
        else if (acv < 70) return 'O'; //
        else if (acv < 60) return 'R'; //
        else if (acv < 50) return 'B'; // 
        else if (acv < 40) return 'S'; //
        else if (acv < 30) return '\u00B6'; // ¶
        else if (acv < 20) return '\u0024'; // $
        else if (acv < 10) return '\u0023'; // #
    }

    #scanImage(cellSize) {
        this.#imageCellArray = [];
        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4;
                const posY = y * 4;
                const pos = (posY * this.#pixels.width) + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const red = this.#pixels.data[pos];
                    const green = this.#pixels.data[pos + 1];
                    const blue = this.#pixels.data[pos + 2];
                    const total = red + green + blue;
                    const averageColorValue = total / 3;
                    const color = `rgb(${red}, ${green}, ${blue})`;
                    const symbol = this.#convertToSymbol(averageColorValue);
                }
            }
        }
    }
}

let effect;
image1.onload = function initialize() {
    canvas.width = image1.width;
    canvas.height = image1.height;
    effect = new AsciiEffect(ctx, image1.width, image1.height);
    console.log(effect);
}