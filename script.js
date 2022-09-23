const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const exampleImgs = ['images/railway1.jpeg', 'images/madlib1.png', 'images/nintendods.png', 'images/arch-linux.png', 'images/apple1.png'];

// setup to read files from local node server
const reader = new FileReader();
const image1 = new Image();

const imgUpload = (e) => {
    reader.onload = () => {
        image1.src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// DOM bindings

// UPLOAD/DOWNLOAD
const imgUploader = document.getElementById('imgUploader');
const imgDownloader = document.getElementById('downloadButton');

// RESOLUTION
const sizeSlider = document.getElementById('resolution');
const inputLabel = document.getElementById('resolutionLabel');

// CHARACTERS
const japaneseBtn = document.getElementById('japanese');
const lettersBtn = document.getElementById('letters');
const symbolsBtn = document.getElementById('symbols');
const binaryBtn = document.getElementById('binary');

// FONTS
const defaultFontBtn = document.getElementById('default');
const monoFontBtn = document.getElementById('monospace');
const serifFontBtn = document.getElementById('serif');
const fantasyFontBtn = document.getElementById('fantasy');

// FONT SIZE
const size4Btn = document.getElementById('size4');
const size10Btn = document.getElementById('size10');
const size16Btn = document.getElementById('size16');
const size24Btn = document.getElementById('size24');
const size32Btn = document.getElementById('size32');
const size36Btn = document.getElementById('size36');
const size40Btn = document.getElementById('size40');

// event listener for img upload
imgUploader.addEventListener('change', imgUpload);

// event listener for img download
imgDownloader.addEventListener('click', download);

// event listener for slider
sizeSlider.addEventListener('change', () => {
    handleSlider();
});

// event listener for character set
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

// event listener for fonts
defaultFontBtn.addEventListener('click', () => {
    handleDefaultFont();
});
monoFontBtn.addEventListener('click', () => {
    handleMonoFont();
});
serifFontBtn.addEventListener('click', () => {
    handleSerifFont();
});
fantasyFontBtn.addEventListener('click', () => {
    handleFantasyFont();
});

// event listeners for font size
size4Btn.addEventListener('click', () => {
    handleSize4();
});
size10Btn.addEventListener('click', () => {
    handleSize10();
});
size16Btn.addEventListener('click', () => {
    handleSize16();
});
size24Btn.addEventListener('click', () => {
    handleSize24();
});
size32Btn.addEventListener('click', () => {
    handleSize32();
});
size36Btn.addEventListener('click', () => {
    handleSize36();
});
size40Btn.addEventListener('click', () => {
    handleSize40();
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
    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#makeAscii();
    }
}

let fontIndex = 0;
let fonts = ['sans-serif', 'monospace', 'serif', 'fantasy'];

let fontSizes = [4, 10, 16, 24, 32, 36, 40];

let effect;

function handleSlider() {
    if (sizeSlider.value == 1) {
        inputLabel.textContent = 'original image';
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    } else {
        inputLabel.textContent = `Resolution: ${sizeSlider.value}px`;
        ctx.font = fontSizes[1] + `px ${fonts[fontIndex]}`;
        effect.draw(parseInt(sizeSlider.value));
    }
}


// functions to set character sets
function handleJpSet() {
    charIndex = 0;
    effect.draw(parseInt(sizeSlider.value));
    japaneseBtn.classList.add('selected');
    lettersBtn.classList.remove('selected');
    symbolsBtn.classList.remove('selected');
    binaryBtn.classList.remove('selected');
}
function handleLetterSet() {
    charIndex = 1;
    effect.draw(parseInt(sizeSlider.value));
    japaneseBtn.classList.remove('selected');
    lettersBtn.classList.add('selected');
    symbolsBtn.classList.remove('selected');
    binaryBtn.classList.remove('selected');
}
function handleSymSet() {
    charIndex = 2;
    effect.draw(parseInt(sizeSlider.value));
    japaneseBtn.classList.remove('selected');
    lettersBtn.classList.remove('selected');
    symbolsBtn.classList.add('selected');
    binaryBtn.classList.remove('selected');
}
function handleBinSet() {
    charIndex = 3;
    effect.draw(parseInt(sizeSlider.value));
    japaneseBtn.classList.remove('selected');
    lettersBtn.classList.remove('selected');
    symbolsBtn.classList.remove('selected');
    binaryBtn.classList.add('selected');
}

// functions to set fonts
function handleDefaultFont() {
    fontIndex = 0;
    ctx.font = fontSize + `px ${fonts[fontIndex]}`;
    effect.draw(parseInt(sizeSlider.value));
    console.log(ctx.font);
    defaultFontBtn.classList.add('selected');
    monoFontBtn.classList.remove('selected');
    serifFontBtn.classList.remove('selected');
    fantasyFontBtn.classList.remove('selected');
}
function handleMonoFont() {
    fontIndex = 1;
    ctx.font = fontSize + `px ${fonts[fontIndex]}`;
    effect.draw(parseInt(sizeSlider.value));
    console.log(ctx.font);
    defaultFontBtn.classList.remove('selected');
    monoFontBtn.classList.add('selected');
    serifFontBtn.classList.remove('selected');
    fantasyFontBtn.classList.remove('selected');
}
function handleSerifFont() {
    fontIndex = 2;
    ctx.font = fontSize + `px ${fonts[fontIndex]}`;
    effect.draw(parseInt(sizeSlider.value));
    console.log(ctx.font);
    defaultFontBtn.classList.remove('selected');
    monoFontBtn.classList.remove('selected');
    serifFontBtn.classList.add('selected');
    fantasyFontBtn.classList.remove('selected');
}
function handleFantasyFont() {
    fontIndex = 3;
    ctx.font = fontSize + `px ${fonts[fontIndex]}`;
    effect.draw(parseInt(sizeSlider.value));
    console.log(ctx.font);
    defaultFontBtn.classList.remove('selected');
    monoFontBtn.classList.remove('selected');
    serifFontBtn.classList.remove('selected');
    fantasyFontBtn.classList.add('selected');
}

// functions to set font size


// functions for init and download final img
image1.onload = function initialize() {
    canvas.width = image1.width;
    canvas.height = image1.height;
    effect = new AsciiEffect(ctx, image1.width, image1.height);
    console.log(effect);
    handleSlider();
}

function download() {
    const finalImg = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = finalImg;
    link.download = 'ascii-image.png';
    link.click();
}