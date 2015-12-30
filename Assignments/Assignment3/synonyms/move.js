var sprite = document.querySelector('.sprite'),
	key = {left: false, right: false},
	trans = 0,
	property = getTransformProperty(sprite);

function getTransformProperty(element) {
    var properties = [
        'transform',
        'WebkitTransform',
        'msTransform',
        'MozTransform',
        'OTransform'
    ];
    var p;
    while (p = properties.shift()) {
        if (typeof element.style[p] != 'undefined') {
            return p;
        }
    }
    return false;
}

function translate() {
	sprite.style[property] = 'translateX(' + trans + 'px)';
}

function walk() {
	key.right = true;
	if (key.right === true) {
		trans += 1;
		translate();
		sprite.classList.add('right');
		sprite.classList.add('walk-right');
	}
}

function stand() {
	key.right = false;
	if (key.right === false) {
		sprite.classList.remove('walk-right');
	}
}


function next_step(number_of_questions) {
	var count = 0;
	var max = (screen.availWidth-200)/number_of_questions;
	var mainLoop = function(time){
    count++;
    if (count <= max )  {
    	walk();
    }
    else {
    	stand();
    }
    // call the animation loop every 1/60th of second
    requestAnimationFrame(mainLoop);
    };
    requestAnimationFrame(mainLoop);
}