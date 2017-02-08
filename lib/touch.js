module.exports = function(planet, cam) { 
	var hammertime = new Hammer(document, {})
	var p = null
	hammertime.on('panstart', function(ev) {
		p = null
	})
	hammertime.on('pan', function(ev) {
		var c = ev.center
		var diff = null
		if(p) { diff = [p[0]-c.x, p[1]-c.y] }
		p = [c.x, c.y]
		if(diff) {
			rotate(0, -diff[0]/3,diff[1]/3)
		}
	});


	hammertime.get('pinch').set({ enable: true })
	hammertime.on('pinchstart', function(ev) { 
		p = ev.scale
	})
	hammertime.on('pinchend', function(ev) { 
		p = null
	})
	hammertime.on('pinch', function(ev) { 
		if(p) {
			var diff = p-ev.scale
			zoom(diff/10)
		}
	})

	function rotate(x,y,z) {
		var r = planet.getAttribute('rotation')
		r.x = r.x + x
		r.y = r.y + y
		r.z = r.z + z
		if(r.x > 360) { r.x = r.x - 360 }
		if(r.y > 360) { r.y = r.x - 360 }
		if(r.z > 360) { r.z = r.x - 360 }
		planet.setAttribute('rotation', r)
	}

	function zoom(z) {
		var p = cam.getAttribute('position')
		p.z = p.z + z
		if(p.z < 1.2) { p.z = 1.2 }
		if(p.z > 5) { p.z = 5 }
		cam.setAttribute('position', p)
	}

}



