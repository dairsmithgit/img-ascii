const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const image1 = new Image();
image1.src = 'https://64.media.tumblr.com/tumblr_l8m9o1HeVl1qbtx6ko1_640.pnj';

image1.onload = function initialize() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = image1.width;
    canvas.height = image1.height;
    ctx.drawImage(image1, 0, 0);
}

// ascii class and private class fields