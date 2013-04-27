ui.infothek = ( function() {
	var api = {};
	api.createWindow = function() {
		var w = Ti.UI.createWindow({
			title : 'Infothek',
			height : '100%',
			backgroundColor : '#33519D',
			barColor : '#333'
		});
		var sections = [];
		var tv = Ti.UI.createTableView({
			color : '#999',
			//	data : sections,
			backgroundColor : '#33519D',
		});
		tv.addEventListener('click', function(e) {
			if(e.rowData.node) {
				var subwin = ui.cms.createMenue(e.rowData.node);
				w.tab.open(subwin);
			}
		});
		w.add(tv);
		var actInd = Ti.UI.createActivityIndicator({
			style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
			message : "Besorge Ihnen die neueste Infothek.",
			backgroundColor : '#D4A017',
			width : 310,
			height : 50,
			color : 'black',
			padding : 10,
			opacity : 0.9,
			borderRadius : 8,
			animation : true,
			font : {
				fontSize : 13
			},
			animated : true,
			bottom : 50
		});
		actInd.show();
		w.add(actInd);

		ctrl.getInfothek(function(data, res) {
			if(!res) {
				actInd.message = 'Kein Internetzugriff. Verwende alte Daten';
				setTimeout(function() {
					actInd.hide()
				}, 2000);
			} else
				actInd.animate(Ti.UI.createAnimation({
					height : 60,
					duration : 400
				}));
			actInd.message = "Daten angekommen … \nviel Spaß beim Stöbern!";
			setTimeout(function() {
				actInd.hide()
			}, 2000);
			sections[0] = Ti.UI.createTableViewSection({
				headerTitle : "Gesundheit",
			});
			var rows = ui.cms.getRows(data[0].subs);
			for(var i = 0; i < rows.length; i++) {
				sections[0].add(rows[i]);
			}
			sections[1] = Ti.UI.createTableViewSection({
				headerTitle : "Schönheit"
			});
			var rows = ui.cms.getRows(data[1].subs);
			for(var i = 0; i < rows.length; i++) {
				sections[1].add(rows[i]);
			}
			sections[2] = Ti.UI.createTableViewSection({
				headerTitle : "Sicherheit"
			});
			var rows = ui.cms.getRows(data[2].subs);
			for(var i = 0; i < rows.length; i++) {
				sections[2].add(rows[i]);
			}
			tv.setData(sections);
		});
		return w;
	};
	return api;
}());
