ui.calendar = ( function() {
	var api = {};

	api.getCalendarSheet = function(day) {
		w = Ti.UI.createWindow({
			barColor : '#333',
			backgroundColor : '#33519D',
			title : 'Menstruationskalender'
		});
		var container = Ti.UI.createView({
			layout : 'vertical'
		});
		var m = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
		var date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth();
		var yy = 1900 +date.getYear();
		var datum = dd + ". " + m[mm] + " " + yy;
		var day = Ti.UI.createLabel({
			text : datum,
			top : 5,
			height : 32,
			textAlign : 'center',
			color : 'white',
			font : {
				fontWeight : 'bold',
				fontSize : 20
			}
		});
		var blutcontainer = Ti.UI.createView({
			width : '90%',
			height : 50,
			backgroundColor : 'white',
			borderRadius : 10,
			borderColor : 'black',
			borderWidth : 1,
			top : 10
		});
		var blutlabel = Ti.UI.createLabel({
			top : 15,
			height : 20,
			left : 25,
			font : {
				fontSize : 18
			},
			text : 'Blutung'
		});
		var blutcheckbox = Titanium.UI.createSwitch({
			value : false,
			top : 15,
			left : 200,
		});
		blutcheckbox.addEventListener('change', function(e) {
			if(e.value == 1) {
				blutcontainer.animate(Ti.UI.createAnimation({
					height : 100,
					duration : 1000
				}));
				blutslider.animate(Ti.UI.createAnimation({
					opacity : 1,
					duration : 100
				}));

			} else {
				blutslider.value = 0;
				blutcontainer.animate(Ti.UI.createAnimation({
					height : 50,
					duration : 1000
				}));
				blutslider.animate(Ti.UI.createAnimation({
					opacity : 0,
					duration : 100

				}));

			}
		});
		var blutslider = Ti.UI.createSlider({
			min : 0,
			max : 5,
			width : '90%',
			bottom : 10,
			height : 100,
			opacity : 1
		});
		var blutdisplay = Ti.UI.createView({
			top : 50,
			left : 20,
			height : 10,
			width : 200
		});
		for(var i = 0; i < 5; i++) {
			blutdisplay.add(Ti.UI.createView({
				width : '100%',
				height : 15,
				left : i * 20,
				borderRadius : 15,
				opacity : 0.2,
				backgroundColor : 'red'
			}));
		}
		lastblut = 0;
		blutcontainer.add(blutdisplay);
		blutslider.addEventListener('change', function(e) {
			var val = parseInt(e.value, 10);
			if(lastblut != val) {
				var kids = blutdisplay.children;
				if(val < lastblut) {
					for( i = val; i < kids.length; i++) {
						kids[i].opacity = '0.23';
					}
				} else {
					for( i = 0; i - val; i++) {
						kids[i].opacity = 1;
					}
				}
				lastblut = val;
			}

		});
			blutcontainer.add(blutlabel);
		blutcontainer.add(blutslider);
		blutcontainer.add(blutcheckbox);

		container.add(blutcontainer);
		//		w.add(basalcontainer);

		var left = Titanium.UI.createButton({
			image : 'assets/icon_arrow_left.png'
		});
		var right = Titanium.UI.createButton({
			image : 'assets/icon_arrow_right.png'
		});

		var flexSpace = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad') {
			// set toolbar
			w.setToolbar([flexSpace, left, flexSpace, day, flexSpace, right, flexSpace]);
			w.toolbarColor = 'black';
		}
		w.add(container);
			//w.add(moon);
		return w;
	};
	return api;
}());
