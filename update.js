const app = new Clarifai.App({
	apiKey: 'af039f0bfa31445b94f72a332313b346'
});

function getArray(str){
	return str.exec('view quote">([^<]*)</a>');
}

function doRequest(url, correct, wrong) {
	app.models.predict(Clarifai.GENERAL_MODEL, url).then(
	  function(response) {
	    correct(response);
	  },
	  function(err) {
	    wrong(err);
	  }
	);
}


//function getWords('image-url') {
// 
//}
// output: array of words

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
	below.style.background = "linear-gradient(to bottom, #7303c0, #ff007b)";
	below.style.height = "550px";
	below.style['padding-top'] = "50px";
	below.style['padding-bottom'] = "100px";
}

var faded = true;

function loadCard(url, caption) {
	var time = 1000;
	setTimeout(expand, time);
	if (faded) {
		time += 1000;
		setTimeout(function() {fadeOut(cardstock, 0.04)}, time);
	}
	time += 1000;
	cardstock.innerHTML = "";
	cardstock.innerHTML += '<img id="insta-image" src="'+url+'">';
	cardstock.innerHTML += '<p id="insta-caption">' + caption +'</p>';
	setTimeout(function() {fadeIn(cardstock, 0.04)}, time);
	time += 1000;
	setTimeout(scrollDown, 5000);
}

setBelow();

$(window).resize(setBelow);

window.onload = function() {
	fadeIn(title, 0.04);
	setTimeout(function() {fadeIn(imageInput, 0.04)}, 500);
	setTimeout(function() {fadeIn(button, 0.04)}, 1000);
	loadCard();
}

$(button).submit(function() {
	let url = $(imageInput).value;
	doRequest(url, 
	function(response) { //right
		var wordsArray = {};
		var reducedArray = response.outputs[0].data.concepts
		for(var i = 0; i++; i < reducedArray.length) {
			wordsArray[i] = reducedArray[i].name;
		}
	},

	function(err) { //wrong
		// do invalid image shit
	}

	)
})