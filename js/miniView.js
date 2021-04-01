var miniViewObject = {
	selector: null,
	zoom: 0.102,
	viewZoom: 1,
	refresh: function (config) {
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
	getParams: function (config) {
		if (!config) return false;
		if (config.selector) this.selector = config.selector;
		if (config.zoom) this.zoom = config.zoom;
		if (config.viewZoom) this.viewZoom = config.viewZoom
	}
};
var setViewZoom = function (event, delta, deltaX, deltaY) {
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
	init: function (config) {
		miniViewObject.getParams(config);
		var selector = config.selector;
		var parentDiv = $(selector).parent();
		parentDiv.after('<div id="minimap">' +
			'<div id="selectWin">' +
			'<div class="selectionWin"></div>' +
			'</div>' +
			'<div id="miniview"></div>' +
			'</div>');

		$(".selectionWin").draggable({
			containment: 'parent',
			drag: function () {
				var selectionLeft = parseInt($(".selectionWin").css("left")),
					selectionTop = parseInt($(".selectionWin").css("top"));
				$(miniViewObject.selector).css({
					left: -selectionLeft / (miniViewObject.zoom / miniViewObject.viewZoom),
					top: -selectionTop / (miniViewObject.zoom / miniViewObject.viewZoom)
				})
			}
		});


		$(selector).mousewheel(function (event, delta, deltaX, deltaY) {
			setViewZoom(event, delta, deltaX, deltaY);
			return false
		});




		$(selector).draggable({
			//containment: 'parent',
			//scroll: false,
			drag: function () {
				/*
				var selectionLeft = parseInt($(".selectionWin").css("left")),
					selectionTop = parseInt($(".selectionWin").css("top"));
				*/
				var left = parseInt($(selector).css("left"));
				var top = parseInt($(selector).css("top"));
				$(".selectionWin").css({
					left: -left * (miniViewObject.zoom / miniViewObject.viewZoom),
					top: -top * (miniViewObject.zoom / miniViewObject.viewZoom)
				});
			}
		});
		miniViewObject.refresh();
		return miniViewObject
	}
}


// // Sample code to activate click event with popup/tooltip.
// document.getElementById("kennedyMuseum").addEventListener("click", function () {
// 	location.href = "http://google.com";
// });

function startTour() {


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
	let kennedy = document.getElementById('kennedy');
	let miniMap = document.getElementById("BackToMainfromMiniMap");
	let backToMap2 = document.getElementById("backToMap2");
	let photoBackground = document.getElementById('photoBackground');


	// Show Kennedy Museum of art
	document.getElementById("kennedyTooltip").addEventListener("click", function () {
		// show aframe scene
		mainScene.style.display = "block";
		// show locations
		kennedy.style.display = "block";
		// 
		// change background photo
		photoBackground.setAttribute('src', "img/kennedyExterior.jpg");
		document.getElementById('kennedyExterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('description').setAttribute('style', "display:block;");
		document.getElementById('description').innerHTML = "";
		
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
		
	
		// show location map
		miniMap.setAttribute('src', "img/kennedyMiniMap.jpg");
		// set border to location map
		miniMap.setAttribute('style', "display:block;");
		backToMap2.setAttribute('style', "display:block;");
		// hide tooltip
		$('.tooltip').tooltipster('hide');
	});



	// Location name clickable
	document.getElementById("kennedyExterior").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyExterior.jpg");
		document.getElementById('description').innerHTML = "";
		document.getElementById('kennedyExterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
		});


	document.getElementById("kennedyFirstEntrance").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirstEntrance.jpg");
		document.getElementById('description').innerHTML = "Pictured is the entrance to the Kennedy Museum of Art.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");

	});
	document.getElementById("kennedyFirst1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirst1.jpg");
		document.getElementById('description').innerHTML = "Pictured are the staircase leading to the second floor and the hallway to the first-floor galleries.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedyFirst2").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirst2.jpg");
		document.getElementById('description').innerHTML = "Pictured in the hallway to the first-floor galleries is the description of the <i>Pattern and Disruption: Diné Lifeways and Embedded Mathematics</i> exhibit.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedyFirst3").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirst3.jpg");
		document.getElementById('description').innerHTML = "Pictured is the <i>Pattern and Disruption: Diné Lifeways and Embedded Mathematics</i> exhibit.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedyFirst4").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedyFirst4.jpg");
		document.getElementById('description').innerHTML = "Pictured is the <i>Pattern and Disruption: Diné Lifeways and Embedded Mathematics</i> exhibit.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});





	document.getElementById("kennedySecondEntrance").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecondEntrance.jpg");
		document.getElementById('description').innerHTML = "Pictured is the second-floor foyer, flanked by the entrance to the Christine Demler Brown (BFA ’68) Center for Art and the hallway leading to two new gallery spaces and the Ballroom.";
		
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedySecond1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecond1.jpg");
		document.getElementById('description').innerHTML = "Pictured is the hallway outside the second floor’s two new gallery spaces and the Ballroom.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedySecond2").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecond2.jpg");
		document.getElementById('description').innerHTML = "Pictured is Lin Hall 210, a gallery renovated with a grant from the Konneker Fund for Learning and Discovery and opened in 2019. It currently houses the <i>Through the Appalachian Forest</i> exhibit.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedySecond3").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecond3.jpg");
		document.getElementById('description').innerHTML = "Pictured is Lin Hall 210, a gallery renovated with a grant from the Konneker Fund for Learning and Discovery and opened in 2019. It currently houses the <i>Through the Appalachian Forest</i> exhibit.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedySecond4").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecond4.jpg");
		document.getElementById('description').innerHTML = "Pictured is Lin Hall 211, which was renovated in 2020 and will house a biological collection from the Crane Hollow Nature Preserve in Hocking County. The collection and the funds to renovate the space were provided by gifts supporting the OHIO Museum Complex.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('kennedySecond5').setAttribute('style', "background: none;");
	});
	document.getElementById("kennedySecond5").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/kennedySecond5.jpg");
		document.getElementById('description').innerHTML = "The second-floor Ballroom has yet to be renovated, but a possible vision for its future has been imagined.";
		document.getElementById('kennedyExterior').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirstEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst1').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst2').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst3').setAttribute('style', "background: none;");
		document.getElementById('kennedyFirst4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecondEntrance').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond1').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond2').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond3').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond4').setAttribute('style', "background: none;");
		document.getElementById('kennedySecond5').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
	});





	// Show building 13
	let building13 = document.getElementById('building13');
	document.getElementById("building13Tooltip").addEventListener("click", function () {
		// show aframe scene
		mainScene.style.display = "block";
		// show locations
		building13.style.display = "block";
		// change background photo
		photoBackground.setAttribute('src', "img/building13Exterior.jpg");
		document.getElementById('description').setAttribute('style', "display:block;");
		document.getElementById('description').innerHTML = "";
		document.getElementById('building13Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building13E1').setAttribute('style', "background: none;");
		document.getElementById('building13E2').setAttribute('style', "background: none;");

		document.getElementById('building13E4').setAttribute('style', "background: none;");
		// show location map
		miniMap.setAttribute('src', "img/building13MiniMap.jpg");
		// set border to location map
		miniMap.setAttribute('style', "display:block;");
		backToMap2.setAttribute('style', "display:block;");
		// hide tooltip
		$('.tooltip').tooltipster('hide');
	});

	// Location name clickable
	document.getElementById("building13Exterior").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building13Exterior.jpg");
		document.getElementById('description').innerHTML = "";
		document.getElementById('building13Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building13E1').setAttribute('style', "background: none;");
		document.getElementById('building13E2').setAttribute('style', "background: none;");
	
		document.getElementById('building13E4').setAttribute('style', "background: none;");
	});

	document.getElementById("building13E1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building13E1.jpg");
		document.getElementById('description').innerHTML = "Pictured is the lobby of the Ohio University Police Department.";
		
		document.getElementById('building13Exterior').setAttribute('style', "background: none;");
		document.getElementById('building13E1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building13E2').setAttribute('style', "background: none;");
	
		document.getElementById('building13E4').setAttribute('style', "background: none;");
	});
	document.getElementById("building13E2").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building13E2.jpg");
		document.getElementById('description').innerHTML = "Pictured is a corridor inside the Ohio University Police Department";
		document.getElementById('building13Exterior').setAttribute('style', "background: none;");
		document.getElementById('building13E1').setAttribute('style', "background: none;");
		document.getElementById('building13E2').setAttribute('style', "background: rgb(199 116 92 / 0.9);");

		document.getElementById('building13E4').setAttribute('style', "background: none;");
	});
	
	document.getElementById("building13E4").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building13E4.jpg");
		document.getElementById('description').innerHTML = "Pictured is the space that houses studios for Ohio University graduate art students.";
		
		document.getElementById('building13Exterior').setAttribute('style', "background: none;");
		document.getElementById('building13E1').setAttribute('style', "background: none;");
		document.getElementById('building13E2').setAttribute('style', "background: none;");

		document.getElementById('building13E4').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
	});


	// Show building 14
	let building14 = document.getElementById('building14');
	document.getElementById("building14Tooltip").addEventListener("click", function () {
		// show aframe scene
		mainScene.style.display = "block";
		// show locations
		building14.style.display = "block";
		// change background photo
		photoBackground.setAttribute('src', "img/building14Exterior.jpg");
		document.getElementById('description').setAttribute('style', "display:block;");
		document.getElementById('description').innerHTML = "Pictured is the courtyard behind Building 14";
		document.getElementById('building14Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
		// show location map
		miniMap.setAttribute('src', "img/building14MiniMap.jpg");
		// set border to location map
		miniMap.setAttribute('style', "display:block;");
		backToMap2.setAttribute('style', "display:block;");
		// hide tooltip
		$('.tooltip').tooltipster('hide');
	});

	// Location name clickable
	document.getElementById("building14Exterior").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14Exterior.jpg");
		document.getElementById('description').innerHTML = "Pictured is the courtyard behind Building 14.";
		document.getElementById('building14Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
	});

	document.getElementById("building14First").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14First.jpg");
		document.getElementById('description').innerHTML = "Pictured is classroom space inside Building 14.";
		document.getElementById('building14Exterior').setAttribute('style', "background: none;");
		document.getElementById('building14First').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
	});

	document.getElementById("building14First1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14First1.jpg");
		document.getElementById('description').innerHTML = "Pictured is where the first floors of Building 14 and 18 meet. Visible are double doors to a shared conference space.";
		document.getElementById('building14Exterior').setAttribute('style', "background: none;");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
	});
	document.getElementById("building14Second").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14Second.jpg");
		document.getElementById('description').innerHTML = "Pictured is the hallway entrance to the second floor of Building 14, which will house flex workspaces. The computer stations visible in the hallway will allow OHIO employees to book flex workspaces.";
		
		document.getElementById('building14Exterior').setAttribute('style', "background: none;");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
	});
	document.getElementById("building14Second1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14Second1.jpg");
		document.getElementById('description').innerHTML = "Pictured is a communal area located off the hallway entrance to the second floor of Building 14.";
		document.getElementById('building14Exterior').setAttribute('style', "background: none;");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building14Second2').setAttribute('style', "background: none;");
	});
	document.getElementById("building14Second2").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building14Second2.jpg");
		document.getElementById('description').innerHTML = "Pictured is a flex workspace/office on the second floor of Building 14. It measures 9x11 feet and would have been a patient’s room when the building was a mental health center.";
		document.getElementById('building14Exterior').setAttribute('style', "background: none;");
		document.getElementById('building14First').setAttribute('style', "background: none;");
		document.getElementById('building14First1').setAttribute('style', "background: none;");
		document.getElementById('building14Second').setAttribute('style', "background: none;");
		document.getElementById('building14Second1').setAttribute('style', "background: none;");
		document.getElementById('building14Second2').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
	});



	// Show building 18
	let building18 = document.getElementById('building18');
	document.getElementById("building18Tooltip").addEventListener("click", function () {
		// show aframe scene
		mainScene.style.display = "block";
		// show locations
		building18.style.display = "block";
		// change background photo
		photoBackground.setAttribute('src', "img/building18Exterior.jpg");
		document.getElementById('description').setAttribute('style', "display:block;");
		document.getElementById('description').innerHTML = "";
		document.getElementById('building18Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building18First').setAttribute('style', "background: none;");
		document.getElementById('building18Third').setAttribute('style', "background: none;");
		document.getElementById('building18Third1').setAttribute('style', "background: none;");

		// show location map
		miniMap.setAttribute('src', "img/building18MiniMap.jpg");
		// set border to location map
		miniMap.setAttribute('style', "display:block;");
		backToMap2.setAttribute('style', "display:block;");
		// hide tooltip
		$('.tooltip').tooltipster('hide');
	});

	// Location name clickable
	document.getElementById("building18Exterior").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building18Exterior.jpg");
		document.getElementById('description').innerHTML = "";
		document.getElementById('building18Exterior').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building18First').setAttribute('style', "background: none;");
		document.getElementById('building18Third').setAttribute('style', "background: none;");
		document.getElementById('building18Third1').setAttribute('style', "background: none;");
	});

	document.getElementById("building18First").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building18First.jpg");
		document.getElementById('description').innerHTML = "Pictured is space on the first floor of Building 18, a portion of which will be occupied by OHIO’s Strategy and Innovation Office.";
		document.getElementById('building18Exterior').setAttribute('style', "background: none;");
		document.getElementById('building18First').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building18Third').setAttribute('style', "background: none;");
		document.getElementById('building18Third1').setAttribute('style', "background: none;");
	});

	document.getElementById("building18Third").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building18Third.jpg");
		document.getElementById('description').innerHTML = "Pictured is the hallway on the third floor of Building 18, which will house OHIO’s Office of Legal Affairs and serve as a hub for staff in the Division of Finance and Administration.";
		
		document.getElementById('building18Exterior').setAttribute('style', "background: none;");
		document.getElementById('building18First').setAttribute('style', "background: none;");
		document.getElementById('building18Third').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
		document.getElementById('building18Third1').setAttribute('style', "background: none;");
	});
	document.getElementById("building18Third1").addEventListener("click", function () {
		photoBackground.setAttribute('src', "img/building18Third1.jpg");
		document.getElementById('description').innerHTML = "Pictured is the easternmost end of the hallway on the third floor of Building 18.";
		
		document.getElementById('building18Exterior').setAttribute('style', "background: none;");
		document.getElementById('building18First').setAttribute('style', "background: none;");
		document.getElementById('building18Third').setAttribute('style', "background: none;");
		document.getElementById('building18Third1').setAttribute('style', "background: rgb(199 116 92 / 0.9);");
	});




	// Back to map function

	document.getElementById("BackToMainfromMiniMap").addEventListener("click", function () {
		// hide aframe scene
		mainScene.style.display = "none";
		document.getElementById('description').innerHTML = ""
		// hide location map
		miniMap.setAttribute('src', "");
		miniMap.setAttribute('style', "display:none;");
		// hide location names
		kennedy.style.display = "none";
		building13.style.display = "none";
		building14.style.display = "none";
		building18.style.display = "none";

	});

	document.getElementById("backToMap2").addEventListener("click", function () {
		// hide aframe scene
		mainScene.style.display = "none";
		document.getElementById('description').innerHTML = ""
		// hide location map
		backToMap2.setAttribute('style', "display: none;");
		// hide location names
		kennedy.style.display = "none";
		building13.style.display = "none";
		building14.style.display = "none";
		building18.style.display = "none";

	});
}