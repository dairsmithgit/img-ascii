const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const exampleImgs = ['images/railway1.jpeg', 'images/madlib1.png', 'images/nintendods.png', 'images/arch-linux.png', 'images/apple1.png'];

const image1 = new Image();
image1.src = exampleImgs[0];

const sizeSlider = document.getElementById('resolution');
const inputLabel = document.getElementById('resolutionLabel');
const japaneseBtn = document.getElementById('japanese');
const lettersBtn = document.getElementById('letters');
const symbolsBtn = document.getElementById('symbols');
const binaryBtn = document.getElementById('binary');

// event listeners for controls
sizeSlider.addEventListener('change', () => {
    handleSlider();
});

japaneseBtn.addEventListener('click', () => {
    handleJpSet();
});
lettersBtn.addEventListener('click', () => {
    handleLetterSet();
});
symbolsBtn.addEventListener('click', () => {
    handleSymSet();
});
binaryBtn.addEventListener('click', () => {
    handleBinSet();
});

// cell class
class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

let charIndex = 0;

// ascii class and private class fields
class AsciiEffect {
    #imageCellArray = [];
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

    // arrays with characters I want to use
    #japanese = ['の', 'か', 'と', 'い', 'る', 'ン', 'ト', 'ス', 'ル', 'は', 'イ', 'に', 'ツ', 'カ', 'テ', 'コ', 'ホ', 'た', 'ム', 'ナ', 'を', 'ケ', 'て', 'ヌ', 'ヘ'];
    #letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
    #symbols = ['.', '[', '^', '*', ']', '/', ':', '_', '%', '>', '(', ')', '~', '•', ';', '&', '£', '¶', '$', '#', 'R', 'E', 'A', 'L', 'M'];
    #binary = ['0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0'];

    #characterSet = [this.#japanese, this.#letters, this.#symbols, this.#binary];

    // averageColorValue passed in as acv
    #convertToSymbol(acv, arr) {
        if (acv > 250) {
            return arr[0];
        } else if (acv > 240) {
            return arr[1]; // [
        } else if (acv > 230) {
            return arr[2];
        } else if (acv > 220) {
            return arr[3];
        } else if (acv > 210) {
            return arr[4]; // ]
        } else if (acv > 200) {
            return arr[5];
        } else if (acv > 190) {
            return arr[6]; // :
        } else if (acv > 180) {
            return arr[7];
        } else if (acv > 170) {
            return arr[8];
        } else if (acv > 160) {
            return arr[9];
        } else if (acv > 150) {
            return arr[10];
        } else if (acv > 140) {
            return arr[11];
        } else if (acv > 130) {
            return arr[12];
        } else if (acv > 120) {
            return arr[13];
        } else if (acv > 110) {
            return arr[14];
        } else if (acv > 100) {
            return arr[15];
        } else if (acv > 90) {
            return arr[16];
        } else if (acv > 80) {
            return arr[17]; // ¶
        } else if (acv > 70) {
            return arr[18];
        } else if (acv > 60) {
            return arr[19];
        } else if (acv > 50) {
            return arr[20]; // $
        } else if (acv > 40) {
            return arr[21];
        } else if (acv > 30) {
            return arr[22];
        } else if (acv > 20) {
            return arr[23];
        } else if (acv > 10) {
            return arr[24]; // #
        }
    }

    #scanImage(cellSize, arr) {
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
                    const symbol = this.#convertToSymbol(averageColorValue, this.#characterSet[charIndex]);
                    if (total > 30) this.#imageCellArray.push(new Cell(x, y, symbol, color));
                }
            }
        }
        console.log(this.#imageCellArray);
    }
    #makeAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }
    draw(cellSize, arr) {
        this.#scanImage(cellSize);
        this.#makeAscii();
    }
}

let effect;

function handleSlider() {
    if (sizeSlider.value == 1) {
        inputLabel.textContent = 'original image';
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    } else {
        inputLabel.textContent = `Resolution: ${sizeSlider.value}px`;
        // ctx.font = parseInt(sizeSlider.value) * 1.5 + 'px monospace';
        effect.draw(parseInt(sizeSlider.value));
    }
}



function handleJpSet() {
    charIndex = 0;
    effect.draw(parseInt(sizeSlider.value));
}
function handleLetterSet() {
    charIndex = 1;
    effect.draw(parseInt(sizeSlider.value));
}
function handleSymSet() {
    charIndex = 2;
    effect.draw(parseInt(sizeSlider.value));
}
function handleBinSet() {
    charIndex = 3;
    effect.draw(parseInt(sizeSlider.value));
}

image1.onload = function initialize() {
    canvas.width = image1.width;
    canvas.height = image1.height;
    effect = new AsciiEffect(ctx, image1.width, image1.height);
    console.log(effect);
    handleSlider();
}