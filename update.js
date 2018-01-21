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
    var op = 0.001;  // initial opacity
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    element.style.visibility = 'visible';
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

let masthead = document.getElementById('masthead');

function getPadding() {
	return parseInt($(masthead).css('padding-top'), 10);
}

let title = document.getElementById('title');
let cardstock = document.getElementById('cardstock');
let button = document.getElementById('button');
let imageInput = document.getElementById('image-input');
let below = document.getElementById('below');

function setBelow() {
	let mastheadHeight = 2 * getPadding() + 140.7;
	let pageHeight = $(document).height();
	console.log(mastheadHeight);
	console.log(pageHeight);
	below.style.height = String(pageHeight - mastheadHeight) + "px";
}

function scrollDown() {
  document.querySelector('#cardstock').scrollIntoView({ 
  	behavior: 'smooth' 
  });
}

function expand() {
	below.style.height = "650px";
	below.style['padding-top'] = "50px";
	below.style['padding-bottom'] = "100px";
}

setBelow();

$(window).resize(setBelow);

window.onload = function() {
	fadeIn(title, 0.04);
	setTimeout(function() {fadeIn(imageInput, 0.04)}, 500);
	setTimeout(function() {fadeIn(button, 0.04)}, 1000);
	setTimeout(expand, 3000);
	setTimeout(function() {fadeIn(cardstock, 0.04)}, 4000);
	setTimeout(scrollDown, 5000);

}