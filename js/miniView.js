var miniViewObject = {
	selector: null,
	zoom: 0.1,
	viewZoom: 1,
	refresh: function(config) {
		this.getParams(config);
		var selector = this.selector,
			p = ["webkit", "moz", "ms", "o"],
			oString = "left top";
			
		if (config && config.viewZoom)
			this.viewZoom = config.viewZoom;
		
		var el = $(selector).clone().removeAttr("style"),
			s = "scale(" + this.zoom + ")",
			parentDiv = $(selector).parent();
			
		for (var i = 0; i < p.length; i++) {
			el[0].style[p[i] + "Transform"] = s;
			el[0].style[p[i] + "TransformOrigin"] = oString
		}
		
		el[0].style["transform"] = s;
		el[0].style["transformOrigin"] = oString;
		
		$("#miniview " + selector + "Mini").remove();
		$("#miniview").append(el.attr("id", $(selector).attr("id") + "Mini").removeAttr("data-bind"));
		
	
		$("#minimap, #selectWin, #miniview").css({
			width: $(selector).width() * this.zoom,
			height: $(selector).height() * this.zoom
		});
		

		$(".selectionWin").css({
			width: parentDiv.width() * this.zoom / this.viewZoom,
			height: parentDiv.height() * this.zoom / this.viewZoom
		});
		

		var selLeft = parseInt($(selector).css("left")),
			selTop = parseInt($(selector).css("top"));
		$(".selectionWin").css({
			left: -selLeft * this.zoom / this.viewZoom,
			top: -selTop * this.zoom / this.viewZoom
		})
	},
	getParams: function(config) {
		if (!config) return false;
		if (config.selector) this.selector = config.selector;
		if (config.zoom) this.zoom = config.zoom;
		if (config.viewZoom) this.viewZoom = config.viewZoom
	}
};
var setViewZoom = function(event, delta, deltaX, deltaY) {
		var el = event.delegateTarget,
			mousePosX = event.clientX - el.offsetLeft,
			mousePosY = event.clientY - el.offsetTop,
			origZoom = miniViewObject.viewZoom,
			zoom, elCurrLeft = parseInt($(el).css("left")),
			elCurrTop = parseInt($(el).css("top"));
			
		if (delta > 0 && origZoom < 2)
			zoom = origZoom + 0.05;
		else if (delta < 0 && origZoom > 0.5)
			zoom = origZoom - 0.05;
		else
			return false;
		
		var p = ["webkit", "moz", "ms", "o"],
			s = "scale(" + zoom + ")",
			oString = "left top";
			
		for (var i = 0; i < p.length; i++) {
			el.style[p[i] + "Transform"] = s;
			el.style[p[i] + "TransformOrigin"] = oString
		}
		
		el.style["transform"] = s;
		el.style["transformOrigin"] = oString;
		
		var leftDiff = mousePosX * (1 - zoom / origZoom),
			TopDiff = mousePosY * (1 - zoom / origZoom);
		$(el).css("left", elCurrLeft + leftDiff);
		$(el).css("top", elCurrTop + TopDiff);
		
		miniViewObject.refresh({
			viewZoom: zoom
		});
		
		return false
	};
window.MiniView = {
	init: function(config) {
		miniViewObject.getParams(config);
		var selector = config.selector;
		var parentDiv = $(selector).parent();
		parentDiv.after('<div id="minimap">'
							+ '<div id="selectWin">' 
								+ '<div class="selectionWin"></div>'
							+ '</div>'
							+ '<div id="miniview"></div>'
						+ '</div>');
			
		$(".selectionWin").draggable({
			containment: 'parent',
			drag: function() {
				var selectionLeft = parseInt($(".selectionWin").css("left")),
					selectionTop = parseInt($(".selectionWin").css("top"));
				$(miniViewObject.selector).css({
					left: -selectionLeft / (miniViewObject.zoom / miniViewObject.viewZoom),
					top: -selectionTop / (miniViewObject.zoom / miniViewObject.viewZoom)
				})
			}
		});
		

		$(selector).mousewheel(function(event, delta, deltaX, deltaY) {
			setViewZoom(event, delta, deltaX, deltaY);
			return false
		});
		


		
		$(selector).draggable({
			//containment: 'parent',
			//scroll: false,
			drag: function() {
				/*
				var selectionLeft = parseInt($(".selectionWin").css("left")),
					selectionTop = parseInt($(".selectionWin").css("top"));
				*/
				var left = parseInt($(selector).css("left"));
				var top = parseInt($(selector).css("top"));
				$(".selectionWin").css({
					left: -left * (miniViewObject.zoom / miniViewObject.viewZoom),
					top:  -top * (miniViewObject.zoom / miniViewObject.viewZoom)
				});
			}
		});
		miniViewObject.refresh();
		return miniViewObject
	}
}

function startTour() {
	
	// // Sample code to activate click event with popup/tooltip.
	// document.getElementById("kennedyMuseum").addEventListener("click", function () {
	// 	location.href = "http://google.com";
	// });

	// Activate Tooltip and set options
	$(document).ready(function () {
		$('.tooltip').tooltipster({
			theme: 'tooltipster-borderless',
			contentAsHTML: true,
			trackOrigin: true,
			trigger: 'click',
			interactive: true
		});
	});
	// Dynamically change minimap size using media query
	if (window.matchMedia("(max-width: 500px)").matches) {
		miniViewObject['zoom'] = '0.08';
	}
	// <polygon class="tooltip" id="tooltip" data-tooltip-content="#tooltip_content" points="1012.93 357.54 1008.57 348.53 1006.55 349.71 1006.25 349.37 987.65 356.77 978.7 337.12 997.66 328.77 996.82 326.45 985.53 331.01 978.21 328.33 974.77 320.34 977.75 313.37 988.74 308.47 987.59 305.81 968.96 313.85 960 294.2 978.97 285.85 979.01 285.2 981.36 283.71 977.31 275.04 993.92 268.19 997.64 277.16 999.96 276.31 1007.16 292.62 1012.44 290.97 1025.96 321.92 1020.64 324.21 1029.2 350.99 1012.93 357.54" />

	// Run function to open given link
	let mainScene = document.getElementById('mainScene');
	let locatioName = document.getElementById('locationName');
	let locationMap = document.getElementById("locationMap");
	let photoBackground = document.getElementById('photoBackground');
	// Show Kennedy Museum of art
	document.getElementById("kennedyA").addEventListener("click", function () {
		// show aframe scene
		mainScene.style.display = "block";
		// show locations
		locatioName.style.display = "block";
		// 
		document.getElementById('kennedyB').setAttribute('style', "background: #fff; color: #000; padding: 0px 5px;");
		// change background photo
		photoBackground.setAttribute('src', "img/kennedyOutside.jpg");
		// show location map
		locationMap.setAttribute('src', "img/locationMap.jpg");
		// set border to location map
		locationMap.setAttribute('style', "width:200px; height:150px; border: 2px solid #000;");
		// hide tooltip
		$('.tooltip').tooltipster('hide');
	});

	

	// Location name clickable
	document.getElementById("kennedyB").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyOutside.jpg");
		document.getElementById('kennedyB').setAttribute('style', "background: #fff; color: #000; padding: 0px 5px;");
		document.getElementById('kennedyFirstFloorB').setAttribute('style', "background: none; color: #fff;");
		document.getElementById('kennedySecondFloorB').setAttribute('style', "background: none; color: #fff;");
	});

	document.getElementById("kennedyFirstFloorB").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirstFloor.jpg");
		document.getElementById('kennedyB').setAttribute('style', "background: none; color: #fff;");
		document.getElementById('kennedyFirstFloorB').setAttribute('style', "background: #fff; color: #000; padding: 0px 5px;");
		document.getElementById('kennedySecondFloorB').setAttribute('style', "background: none; color: #fff;");
	});
	document.getElementById("kennedySecondFloorB").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecondFloor.jpg");
		document.getElementById('kennedyB').setAttribute('style', "background: none; color: #fff;");
		document.getElementById('kennedyFirstFloorB').setAttribute('style', "background: none; color: #fff;");
		document.getElementById('kennedySecondFloorB').setAttribute('style', "background: #fff; color: #000; padding: 0px 5px;");

	});


	// Back to map function
	document.getElementById("backToMap").addEventListener("click", function () {
		// hide aframe scene
		mainScene.style.display = "none";
		// hide location map
		locationMap.setAttribute('src', "");
		locationMap.setAttribute('style', "width:0px; height:0px; border: none;");
		// hide location names
		locatioName.style.display = "none";



	});
}