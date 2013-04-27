ui.skalender = ( function() {
		var api = {};
		api.createWindow = function() {
			function addDays(foo, days) {
				var time = foo.getTime() + days * 24 * 3600000;
				var bar = new Date(time);
				return bar;
			}

			var w = Ti.UI.createWindow({
				title : 'Schwangerschaftkalender',
				backgroundColor : '#33519D',
				barColor : '#333'
			});
			var text = Ti.UI.createLabel({
				color : 'white',
				height : 'auto',
				left : 10,
				right : 10,
				top : 10,
				text : 'Wählen Sie hier den Tag der letzten Menstruation.',
				font : {
					fontSize : 16
				}
			});
			w.add(text);
			var dateValue = new Date();
			var minDate = addDays(dateValue, -240);
			var maxDate = addDays(dateValue, 0);
			var picker = Ti.UI.createPicker({
				type : Ti.UI.PICKER_TYPE_DATE,
				minDate : minDate,
				maxDate : maxDate,
				top : 60,
				value : dateValue,
				selectionIndicator : true,
				locale : 'de_DE'
			});
			picker.addEventListener('change', function(e) {
				dateValue = this.value;
			});
			var b = Ti.UI.createButton({
				title : 'Kalender berechnen',
				width : '90%',
				height : 40,
				bottom : 20
			});
			b.addEventListener('click', function(e) {
				var dialog = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ['Verstanden', 'Abbruch'],
					message : 'Nachfolgender Kalender ist keine Empfehlung, sondern dient lediglich der Information.',
					title : 'Hinweis'
				});
				dialog.show();
				dialog.addEventListener('click', function(_e) {
					if (_e.index == 0)
						var geburt = addDays(dateValue, 280);
					var m = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
					function getWeek(item) {
						var von = addDays(dateValue, 7 * item.w);
						var bis = addDays(dateValue, 7 * item.w + 7 * item.b + 6);
						return von.getDate() + '. ' + m[von.getMonth()] + ' – ' + bis.getDate() + '. ' + m[bis.getMonth()] + (' 20' + bis.getYear()).replace(/201/, '20');
					}

					var kal = Ti.UI.createWindow({
						barColor : '#333',
						backgroundColor : '#33519D',
						title : '＊ ' + geburt.getDate() + '. ' + m[geburt.getMonth()],
						backgroundColor : '#33519D',
						backButtonTitle : 'Niederkunkft'
					});
					var tv = Ti.UI.createTableView({
						height : '100%',
						backgroundColor : '#33519D'
					});
					for (var i = 0; i < massnahmen.length; i++) {
						var row = Ti.UI.createTableViewRow({
							height : 'auto',
							hasChild : true
						});
						var title = Ti.UI.createLabel({
							text : getWeek(massnahmen[i]),
							top : 5,
							left : 10,
							height : 30,
							color : 'white',
							font : {
								fontWeight : 'bold',
								fontSize : 18
							}
						});
						var text = Ti.UI.createLabel({
							text : massnahmen[i].text,
							top : 40,
							left : 10,
							color : 'white',
							right : 15,
							bottom : 10,
							height : 'auto',
							font : {
							}
						});
						row.add(title);
						row.add(text);
						tv.appendRow(row);
					}
					tv.addEventListener('click', function(e) {
						var dialog = Titanium.UI.createOptionDialog({
							title : 'Was ist zu tun?',
							options : ['Im Kalender speichern', 'Gynäkologe anrufen', 'Abbruch'],
							cancel : 2
						});
						dialog.show();
					});
					kal.add(tv);
					w.tab.open(kal);

				});

			});
			w.add(b);
			w.add(picker);
			return w;
		};
		return api;
	}());
