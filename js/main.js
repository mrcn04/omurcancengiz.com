var modeButton = document.querySelectorAll(".mode");
var summary = document.querySelector(".summary");
var text = document.querySelector(".summary").textContent;
var frontend = "On the Frontend, I'm writing HTML, CSS, JavaScript and DOM Manipulation. I'm also using libraries such as Bootstrap and jQuery as well. As the extension languages, I worked with LESS and SASS.";
var backend = "I'm teaching myself to Backend part either. I think It is a good idea to know both sides. I'm using Node.js, Express.js and EJS on my projects as Backend side.";

init();
description();

function loadImage(id, targetId) {
	var el = document.getElementById(id);
	var targetEl = targetId ? document.getElementById(targetId) : el;
	var imageToLoad;

	if (el.dataset.image) {
		imageToLoad = el.dataset.image;
	} else if (typeof el.currentSrc === 'undefined') {
		imageToLoad = el.src;
	} else {
		imageToLoad = el.currentSrc;
	}

	if (imageToLoad) {
		var img = new Image();
		img.src = imageToLoad;
		img.onload = function() {
			targetEl.classList.add('is-loaded');
		};
	}
}

document.addEventListener('DOMContentLoaded', function() {
	loadImage('wallpaper');
	loadImage('pictureImage', 'picture');
});

function init () {
	for (var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click", function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			modeButton[2].classList.remove("selected");
			this.classList.add("selected"); //this refers to the one which is selected
		});
	}
}

function description() {
	for (var i = 0; i < modeButton.length; i++){
		modeButton[0].addEventListener("click", function(){
			summary.textContent = text;
		});
		modeButton[1].addEventListener("click", function(){
			summary.textContent = frontend;
		});
		modeButton[2].addEventListener("click", function(){
			summary.textContent = backend;
		});
	}
}