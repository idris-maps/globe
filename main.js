var rmVr = require('./lib/rm-vr')
var touch = require('./lib/touch')

var planet = document.getElementById('planet')
var scene = document.getElementById('scene')
var sphere = document.getElementById('sphere')
var switchBtn = document.getElementById('switch')
var texture = document.getElementById('texture')

var current = 0
var imgs = ['countries', 'physical','night']

window.onload = function() {

	setTimeout(function() {
		rmVr()
	},500)
	touch(planet, cam)
	switchBtn.onclick = function() {
		current = current + 1
		if(current === 3) { current = 0 }
		var attrs = sphere.attributes
		for(i=0;i<attrs.length;i++) {
			if(attrs[i].name === 'material') { attrs[i].value = 'src: #' + imgs[current] }
		}
	}
}
