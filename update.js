const app = new Clarifai.App({
	apiKey: 'af039f0bfa31445b94f72a332313b346'
});

function getArray(str){
	var re = RegExp('view quote">([^<]*)</a>', 'g');
	var arr = {};
	var i = 0;
	do {
	    m = re.exec(str);
	    if (m) {
	   		console.log(m[1]);
	        arr[i] = m[1];
	        i++;
	    }
	} while (m);
	arr.length = i;
	return arr;
}

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';


function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open('GET', cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        'GET' + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    x.send(options.data);
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
	below.style.height = String(pageHeight - mastheadHeight) + "px";
}

function scrollDown() {
  document.querySelector('#cardstock').scrollIntoView({ 
  	behavior: 'smooth' 
  });
}

function expand() {
	below.style.background = "linear-gradient(to bottom, #7303c0, #ff007b)";
	below.style.height = "600px";
	below.style['padding-top'] = "50px";
	below.style['padding-bottom'] = "100px";
}

var faded = false;

function loadCard(url, caption) {
	var time = 1000;
	setTimeout(expand, time);
	// if (faded) {
	// 	time += 1000;
	// 	setTimeout(function() {fadeOut(cardstock, 0.04)}, time);
	// }
	time += 1000;
	cardstock.innerHTML = "";
	cardstock.innerHTML += '<img id="insta-image" src="'+url+'">';
	cardstock.innerHTML += '<p id="insta-caption"><span id="insta-span">' + caption +'</span></p>';
	setTimeout(function() {fadeIn(cardstock, 0.04)}, time);
	time += 1000;
	setTimeout(scrollDown, 5000);
	faded = true;
}

setBelow();

$(window).resize(setBelow);

window.onload = function() {
	fadeIn(title, 0.04);
	setTimeout(function() {fadeIn(imageInput, 0.04)}, 500);
	setTimeout(function() {fadeIn(button, 0.04)}, 1000);
}

function searchBQ(word, callback){
	console.log(word);
	doCORSRequest({
		url: "https://www.brainyquote.com/topics/" + word
	}, function(data) {callback(getArray(data))});
}

let invalid = document.getElementById('invalid');

function invalidImage() {
	invalid.style.display = 'block';
}

$('#button').click(()=>{
	let url = $(imageInput).val();
	invalid.style.display = 'none';
	try {
		doRequest(url, 
		function(response) { //right
			var wordsArray = {};
			var reducedArray = response.outputs[0].data.concepts
			for(var i = 0; i < reducedArray.length; i++) {
				wordsArray[i] = reducedArray[i].name;
			}
			var ind = 0;
			for(var i = 0; i < reducedArray.length; i++) {
				console.log(wordsArray[i]);
				if (wordsArray[i] === "no person") {
					ind++;
				}
				else
					break;
			}
			searchBQ(wordsArray[ind], function(quoteArray) {
				for(var i = 0; i < quoteArray.length; i++) {
					console.log(quoteArray[i]);
				}
				var quote
				do {
					var rand2 = Math.floor(quoteArray.length * Math.random());
					quote = quoteArray[rand2];
				} while (quote.length < 70 || quote.length > 105)
				loadCard(url, quote);
			});
		},

		function(err) { //wrong
			invalidImage();
		}

		)
	}
	catch (e) {
		invalidImage();
	}
})