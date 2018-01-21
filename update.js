const app = new Clarifai.App({
	apiKey: 'af039f0bfa31445b94f72a332313b346'
});

function fadeOut(element, speed) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= speed){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * speed;
    }, 50);
}

function fadeIn(element, speed) {
    var op = speed;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * speed;
    }, 10);
}

let title = document.getElementById('title');
let cardstock = document.getElementById('cardstock');
let button = document.getElementById('button');
let imageInput = document.getElementById('image-input');

fadeIn(title, 0.02);
fadeIn(imageInput, 0.02);
fadeIn(button, 0.02);