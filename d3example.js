if (typeof require === "function") {
	var d3 = require('d3.v4.0.0-alpha.35.js')
	var d3controls = require('d3controls.js')
}

// Adapted from https://github.com/tj/d3-dot
var gen = function(n, l, h, s) {
  var data = []

  for (var i = n; i; i--) {
    data.push({
      x: Math.random() * l | 0,
      y: Math.random() * h | 0,
			s: s
    })
  }

  return data
}

// Adapted from http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
// From http://bl.ocks.org/jdarling/06019d16cb5fd6795edf
var randomColor = (function(){
  var golden_ratio_conjugate = 0.618033988749895;
  var h = Math.random();

  var hslToRgb = function (h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }

      return '#'+Math.round(r * 255).toString(16)+Math.round(g * 255).toString(16)+Math.round(b * 255).toString(16);
  };
  
  return function(){
    h += golden_ratio_conjugate;
    h %= 1;
    return hslToRgb(h, 0.5, 0.60);
  };
})();



var state = {
	n: 20,
	s: 10,
	width: 200,
	height: 200
}

// var jsonCircles = gen(state.n, state.width, state.height)
 
 var svgContainer = d3.select("body")
 			.append("svg")
            .attr("width", state.width)
            .attr("height", state.height);
 
var circles = svgContainer.selectAll("circle")
            .data(gen(state.n, state.width, state.height, state.s), 
							function(d, i) { return d.id || (d.id = ++i); })
            .enter()
            .append("g")
						.attr("class", "circle")

circles.append('circle')
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .attr("r", function (d) { return d.s; })
            .style("fill",randomColor)
						.attr("stroke-width", 1)
						.attr("stroke", "grey")
						
circles.append("text")
						.attr("x", function(d) { return d.x })
						.attr("y", function(d) { return d.y })
						.style("text-anchor", "middle")
						.style("font-family", "sans-serif")
						.style("font-size", "7px")
						.style("fill", "black")
						.text(function(d) { return d.id });

var rects = svgContainer.selectAll("rects")
            .data(gen(state.n, state.width, state.height, state.s), 
							function(d, i) { return d.id || (d.id = ++i); })
            .enter()
            .append("g")
						.attr("class", "rect")

rects.append('rect')
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return 2 * d.s; })
            .attr("width", function (d) { return 2 * d.s; })
            .style("fill",randomColor)
						.attr("stroke-width", 1)
						.attr("stroke", "grey")

rects.append("text")
						.attr("x", function(d) { return d.x + d.s })
						.attr("y", function(d) { return d.y + d.s })
						.style("text-anchor", "middle")
						.style("font-family", "sans-serif")
						.style("font-size", "7px")
						.style("fill", "black")
						.text(function(d) { return d.id });

d3controls.dragControls()(circles)
d3controls.dragControls()(rects)