if (typeof require === "function") {
	var d3 = require('d3.v4.0.0-alpha.35.js')
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3controls = global.d3controls || {})));
}(this, function (exports) { 'use strict';



// https://github.com/d3/d3-drag/blob/master/src/drag.js
 function dragControls (scope) {	

		function prevent() {
			event.preventDefault();
		}

		function d3_window(node) {
			return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
		}

		var scope = scope	// selection
 			
		var dName = 'drag'
		var aTypes = {
				start: 	dName + 'start', // dragstart
				move: 	dName + 'move',	// dragmove
				end: 		dName + 'end'		// dragend
			}	
		var aTypesList = Object.keys(aTypes).map(function(k){return aTypes[k]})
		var qaTypesList = aTypesList.map(function(k){return k + "." + dName})

		var fnCallbacks = {}
			for (var i = 0; i < aTypesList.length; i++) {
				fnCallbacks[aTypesList[i]] = function(action) {}
		}		
	
		// ______________________________ dragend
		fnCallbacks[aTypes.end] = function(action) {
			var node = d3.select(this)
			node.datum().dx1 = action.dx1
			node.datum().dy1 = action.dy1
		}
		
		// ______________________________ dragmove
		fnCallbacks[aTypes.move] = function(action) {						
				var node = d3.select(this)
				node
					.attr("transform", "translate(" + action.dx1 + "," + action.dy1 + ")")
			}
		// ______________________________ dispatcher
		var d3_event = d3.dispatch.apply(null, aTypesList)
		for (var i=0; i < qaTypesList.length; i++) {
				d3_event.on(qaTypesList[i], fnCallbacks[aTypesList[i]])
		}		
		d3_event.of = function(thiz, argumentz) {
			return function(e1) {
					d3_event.call(e1.type, thiz, e1)
			}
		}
		// ______________________________ listener
		function started(d, i, nodes) {
					var node = this, 
							parent = node.parentNode,
							origin = d3.mouse(parent),
							ox = d.x - origin[0] || 0,
							oy = d.y - origin[1] || 0,
							dragged = false
							
					var context = d3.select(d3_window(node))
										.on("dragstart.drag", prevent)
										.on("selectstart.drag", prevent)
										.on("mouseup", ended)
										.on("mousemove", moved)
							
							
					var emit = d3_event.of(node, arguments)
						
		// ______________________________ when moved
					function moved() {
							var p = d3.mouse(parent)											
											
							var a = {
										type: aTypes.move,
										x0: origin[0] + ox,	// first x
										y0: origin[1] + oy,
										x1: p[0] + ox,		// new x position
										y1: p[1] + oy,
										dx: p[0] - origin[0],		// delta x
										dy: p[1] - origin[1],
										dx1: (d.dx1 || 0) + p[0] - origin[0], // aggregated delta x
										dy1: (d.dy1 || 0)  + p[1] - origin[1]
								}
								emit(a)
					}
					
		// ______________________________ when ended
					function ended() {
								context.on("mousemove", null)
											.on("mouseup", null);

								var p = d3.mouse(parent)
								var a = {
										type: aTypes.end,
										x0: origin[0] + ox,	// first x
										y0: origin[1] + oy,
										x1: p[0] + ox,		// new x position
										y1: p[1] + oy,
										dx: p[0] - origin[0],		// delta x
										dy: p[1] - origin[1],
										dx1: (d.dx1 || 0) + p[0] - origin[0], // aggregated delta x
										dy1: (d.dy1 || 0)  + p[1] - origin[1]
								}
								emit(a)
					}
					function afterended() {
							context.on("click.drag", null);
					}					
		}
		
	  function drag(selection) {
      selection.on("mousedown.drag", started)	
		}
	  drag.on = function() {
			var value = d3_event.on.apply(d3_event, arguments);
			return value === d3_event ? drag : value;
		};

		return drag;			
}		

exports.dragControls = dragControls;
}));