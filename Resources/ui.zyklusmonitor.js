ui.calendar = ( function() {
	var api = {};
	api.monitors = {};
	api.getCalendar = function(w) {
		api.calDay = function(i, e) {
			var row = parseInt(i / 7, 10);
			var col = i % 7;
			var width = 320 / 7;
			var cellid = '' + e.yymm + e.day;
			var calendarDay = Ti.UI.createLabel({
				left : col * width,
				top : row * width * 1.25,
				width : width,
				height : width * 1.25,
				borderWidth : 0.5,
				borderColor : 'gray',
				color : (e.month == 'thisMonth') ? '#333' : 'silver',
				backgroundColor : '#eee',
				yymm : e.yymm,
				text : e.day,
				font : {
					fontWeight : 'bold',
					fontSize : 23,
					fontfamily : 'SansationBold'
				},
				textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
				shadowOffset : {
					x : 1,
					y : 1
				},
				dd : e.day,
				zIndex : 99
			});
			// Blutungsanzeige
			var monitor = Ti.UI.createLabel({
				height : 1,
				backgroundImage : '/assets/shadow_.png',
				backgroundColor : '#ff0000',
				bottom : 0,
				zIndex : 0,
				width:'100%',
				visible : false
			});
			if(e.pegelstaende)
				e.pegelstaende[e.day] = monitor;
			calendarDay.add(monitor);
			calendarDay.monitor = monitor;
			this.monitors[cellid] = monitor;
			if(col > 4 && e.month == 'thisMonth') {
				calendarDay.backgroundColor = '#fcc';
			}
			calendarDay.addEventListener('click', function(e) {
				var cell = e.source;
				if(!cell.yymm)
					return;
				var oldcolor = cell.backgroundColor;
				cell.backgroundColor = '#999';
				var dialog = Ti.UI.createOptionDialog({
					title : 'Wie stark ist die Menstruation?',
					options : ['keine', 'ein wenig', 'mittel', 'stark'],
					cancel : 4
				});
				dialog.show();
				dialog.addEventListener('click', function(e) {
					cell.backgroundColor = oldcolor;
					var data = {
						"yymm" : cell.yymm,
						"dd" : cell.dd,
						"value" : e.index
					};
					ctrl.zyklusmonitor.setData(data);
					cell.monitor.setVisible((e.index) ? true : false);
					cell.monitor.animate(Ti.UI.createAnimation({
						duration : 1200,
						opacity : 0.9,
						height : 6 * e.index + 1
					}));
				});
			});
			calendarDay.month = e.month;
			calendarDay.text = e.day;
			return calendarDay;
		}
		var monthName = function(e) {
			var m = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
			return m[e];
		};
		api.calView = function(e) {
			var pegelstaende = {};
			var wrapper = Ti.UI.createView({
				width : 320,
				heigth : '100%'
			});
			// Weekdays:
			for(var i = 0; i < 7; i++) {
				var tage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
				wrapper.add(Ti.UI.createLabel({
					text : tage[i],
					top : 4,
					font : {
						fontSize : 13,
						fontfamily : 'SansationRegular'
					},
					height : 20,
					color : 'white',
					left : (i * 320 / 7) + 15
				}));
			}
			/* ============== */
			var calcontainer = Ti.UI.createView({
				width : 320,
				heigth : '100%',
				top : 25,
				title : monthName(e.mm) + ' ' + e.yy,
			});
			wrapper.add(calcontainer);

			var daysInMonth = 32 - new Date(e.yy, e.mm, 32).getDate();
			var dayOfMonth = new Date(e.yy, e.mm, e.dd).getDate();
			var dayOfWeek = new Date(e.yy, e.mm, 0).getDay();
			var daysInLastMonth = 32 - new Date(e.yy, e.mm - 1, 32).getDate();
			var daysInNextMonth = (new Date(e.yy, e.mm, daysInMonth).getDay()) - 7;
			var dayNumber = daysInLastMonth - dayOfWeek + 1;
			var dayofView = 0;
			// Vorlauf:
			for( i = 0; i < dayOfWeek; i++) {
				var day = this.calDay(dayofView, {
					day : dayNumber,
					month : 'otherMonth',
					dayOfMonth : ''

				});
				calcontainer.add(day);
				dayNumber += 1;
				dayofView++;
			};
			// Hauptlauf:
			dayNumber = 1;
			var mm = (e.mm < 10) ? '0' + e.mm : e.mm;
			for( i = 0; i < daysInMonth; i++) {
				var newDay = this.calDay(dayofView, {
					day : dayNumber,
					dayOfWeek : dayOfWeek,
					yymm : '' + e.yy + mm,
					month : 'thisMonth',
					dayOfMonth : dayOfMonth,
					pegelstaende : pegelstaende

				});
				dayofView++;
				calcontainer.add(newDay);
				dayNumber++;
			};
			// Daten holen:
			var self = this;
			ctrl.zyklusmonitor.getDatas('' + e.yy + mm, function(datas) {
				for(var i = 0; i < datas.length; i++) {
					var entry = datas[i];
					var monitor = self.monitors[entry.cellid];
					monitor.setHeight(entry.val * 6);
					monitor.setVisible((entry.val) ? true : false);
				}
			});
			// Nachlauf :
			dayNumber = 1;
			for( i = 0; i > daysInNextMonth; i--) {
				var newDay = this.calDay(dayofView, {
					day : dayNumber,
					month : 'otherMonth',
					dayOfMonth : ''
				});
				dayofView++;
				calcontainer.add(newDay);
				dayNumber++;
			};
			wrapper.add(Ti.UI.createImageView({
				image : '/assets/shadow.png',
				height : 18,
				width : 320,
				top : 0
			}));
			var height = dayofView / 7 * 320 / 7 * 1.25 + 40;

			return wrapper;
		};
		var cals = [];
		var views = [];
		var total = 4;
		for(var x = 0; x < total; x++) {
			views[x] = Ti.UI.createView({
				width : '100%',
				height : '100%'
			});
		}
		var wrapper = Ti.UI.createScrollableView({
			width : 320,
			height : '100%',
			views : views,
			currentPage : total - 1
		});
		var yy = Date.today().getFullYear();
		var mm = Date.today().getMonth();
		var dd = Date.today().getDate();
		cals[total - 1] = this.calView({
			which : 'current',
			yy : yy,
			mm : mm,
			dd : dd
		});
		views[total - 1].title = monthName(mm) + ' ' + yy;
		w.title = 'Zyklusmonitor';
		//monthName(mm) + ' ' + yy;
		views[total - 1].add(cals[total - 1]);
		var self = this;
		setTimeout(function() {
			for(var x = 1; x < total; x++) {
				var myDate = Date.today().add(x - total + 1).months();
				var yy = myDate.getFullYear();
				var mm = myDate.getMonth();
				var dd = myDate.getDate();
				cals[x] = self.calView({
					which : 'current',
					yy : yy,
					mm : mm,
					dd : dd
				});
				views[x].title = monthName(mm) + ' ' + yy
				views[x].add(cals[x]);
			}
		}, 100);
		wrapper.addEventListener('scroll', function(e) {
			w.title = e.view.title;
		});
		var left = Titanium.UI.createButton({
			left : 10,
			top : 5,
			width : 40,
			image : '/assets/icon_arrow_left.png'
		});
		left.addEventListener('click', function(e) {
			var index = wrapper.getCurrentPage();
			if(index>1)
				wrapper.scrollToView(views[index - 1]);
		})
		var right = Titanium.UI.createButton({
			right : 10,
			top : 5,
			width : 40,
			opacity : 0,
			image : '/assets/icon_arrow_right.png'
		});
		right.addEventListener('click', function(e) {
			var index = wrapper.getCurrentPage();
			if(index < total - 1)
				wrapper.scrollToView(views[index + 1]);
		})
		w.leftNavButton = left;
		w.rightNavButton = right;
		return wrapper;
	};
	return api;
}());
