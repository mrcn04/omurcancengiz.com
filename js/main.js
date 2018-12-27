var modeButton = document.querySelectorAll(".mode");
var summary = document.querySelector(".summary");
var text = document.querySelector(".summary").textContent;
var frontend = "I'm maintaining my projects on Frontend with HTML, CSS, JavaScript, Bootstrap, jQuery etc. which I am highly skilled on and remodeling my skills with specializing on React.js";
var backend = "On the journey of becoming Full Stack Developer, I'm improving my skills on Node.js, Express.js, EJS, Passport.js etc. as Backend and MongoDB with Mongoose as NoSQL database.";

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