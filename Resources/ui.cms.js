ui.cms = ( function() {
	var api = {};
	api.getRows = function(items) {
		var rows = [];
		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			var row = Ti.UI.createTableViewRow({
				backgroundColor : '#33519D',
				hasChild : true,
				node : item,
				height : 'auto'
			});
			var title = Ti.UI.createLabel({
				left : 60,
				color : 'white',
				height : 20,
				top : 8,
				font : {
					fontWeight : 'bold',
					fontSize : 18,
					fontfamily : 'Sansation'
				},
				text : item.name
			});
			row.add(title);
			row.add(Ti.UI.createLabel({
				left : 60,
				color : 'white',
				font : {
					fontSize : 15,
					fontfamily : 'Sansation'
				},
				height : 40,
				top : 5,
				text : item.teaser
			}));
			var klotz1 = Ti.UI.createView({
				width : 15,
				height : 15,
				left : 5,
				top : 5,
				backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
			});
			var klotz2 = Ti.UI.createView({
				width : 15,
				height : 15,
				left : 20,
				top : 5,
				backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
			});
			var klotz3 = Ti.UI.createView({
				width : 15,
				height : 15,
				left : 5,
				top : 20,
				backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
			});
			var klotz4 = Ti.UI.createView({
				width : 15,
				height : 15,
				left : 20,
				top : 20,
				backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
			});
			row.add(klotz1);
			row.add(klotz2);
			row.add(klotz3);
			row.add(klotz4);
			rows.push(row);
		}
		return rows;
	};
	api.getUrls = function(rows, items) {

		for(var i = 0; i < items.length; i++) {
			var item = items[i];
			var row = Ti.UI.createTableViewRow({
				backgroundColor : '#33519D',
				hasChild : true,
				url : item.url,
				webtitle : item.name,
				height : 'auto'
			});
			var title = Ti.UI.createLabel({
				left : 60,
				color : 'white',
				height : 20,
				top : 8,
				font : {
					fontWeight : 'bold',
					fontSize : 18,
					fontfamily : 'Sansation'
				},
				text : item.name
			});
			row.add(title);
			var logo = Ti.UI.createImageView({
				width : 40,
				image : '/assets//web.png',
				height : 30,
				left : 3,
				top : 3,
				bottom : 3
			});
			row.add(logo);
			rows.push(row);
		}
		return rows;
	};
	api.createMenue = function(node) {
		var w = Titanium.UI.createWindow({
			backgroundColor : '#33519D',
			barColor : '#333'
		});
		var rows = [];
		if(node.subs) {
			rows = this.getRows(node.subs);
		}
		if(node.urls) {
			this.getUrls(rows, node.urls);
		}
		if(node.text) {
			var row = Ti.UI.createTableViewRow({
				height : 'auto',
				backgroundColor : '#33519D'
			});
			var summary = Ti.UI.createLabel({
				text : node.text,
				height : 'auto',
				left : 10,
				right : 10,
				bottom : 10,
				font : {
					fontfamily : 'Sansation',
					fontSize:16
				},
				top : 10,
				color : '#fff'
			});
			row.add(summary);
			rows.push(row);
		}
		var self = this;
		var tv = Ti.UI.createTableView({
			color : '#999',
			data : rows,
			backgroundColor : '#33519D',
		});
		tv.addEventListener('click', function(e) {
			if(e.rowData.node) {
				var subwin = self.createMenue(e.rowData.node);
				w.tab.open(subwin);
			} else if(e.rowData.url) {
				var subwin = Ti.UI.createWindow({
					title : e.rowData.webtitle,
					barColor: "#333"
				});
				var wv = Ti.UI.createWebView({
					url : e.rowData.url
				});
				subwin.add(wv);
				w.tab.open(subwin);
			}
		});
		w.add(tv);
		w.title = node.name;
		return w;
	};
	api.createNews = function(news) {
		var w = Titanium.UI.createWindow({
			backgroundColor : '#33519D',
			barColor : '#333'
		});

		var self = this;
		var tv = Ti.UI.createTableView({
			color : '#999',
			data : rows,
			backgroundColor : '#33519D',
		});
		tv.addEventListener('click', function(e) {
			var item = e.rowData.news;
			var detailwindow = Ti.UI.createWindow({
				backgroundColor : '#33519D',
				title : item.title,
				barColor : '#333'
			});
			var container = Ti.UI.createScrollView({
				width : '100%',
				height : '100%',
				layout : 'vertical',
				contentWidth : '100%',
				contentHeight : 'auto'
			});
			if(item.img) {
				var img = Ti.UI.createImageView({
					image : item.img[0],
					top : 5,
					width : '100%',
					height : 'auto'
				});
				container.add(img);
			}
			if(item.links) {
				var rows = [];
				for(var i = 0; i < item.links.length; i++) {
					var row = Ti.UI.createTableViewRow({
						url : item.links[i].url
					});
					var linktext = Ti.UI.createLabel({
						text : item.links[i].name,
						font : {
							fontfamily : 'SansationRegular'
						}
					});
					row.add(linktext);
					rows.push(row);
				}
				var links = Ti.UI.createTableView({
					height : 100,
					backgroundColor : '#555',
					left : 10,
					right : 10,
					borderRadius : 7,
					data : rows,
					//	headerTitle : 'nützliche Links:',
					touchEnabled : false
				});
				container.add(links);
			}

			var text = Ti.UI.createLabel({
				left : 10,
				right : 10,
				top : 10,
				font : {
					fontfamily : 'SansationRegular'
				},
				height : 'auto',
				color : 'white',
				text : item.text
			});

			container.add(text);
			detailwindow.add(container);
			w.tab.open(detailwindow);
		});

		ctrl.getNews(function(news) {
			var rows = [];
			for(var i = 0; i < news.length; i++) {
				var item = news[i];
				var row = Ti.UI.createTableViewRow({
					backgroundColor : '#33519D',
					hasChild : true,
					news : item,
					height : 'auto'

				});
				var title = Ti.UI.createLabel({
					left : 70,
					color : 'white',
					height : 30,
					top : 8,
					font : {
						fontWeight : 'bold',
						fontSize : 18,
						fontfamily : 'SansationRegular'
					},
					text : item.title
				});
				row.add(title);
				row.add(Ti.UI.createLabel({
					left : 70,
					right : 10,
					color : 'white',
					font : {
						fontSize : 14,
						fontfamily : 'SansationRegular'
					},
					height : 60,
					top : 40,
					bottom : 10,
					text : item.text
				}));
				var klotz1 = Ti.UI.createView({
					width : 15,
					height : 15,
					left : 5,
					top : 5,
					backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
				});
				var klotz2 = Ti.UI.createView({
					width : 15,
					height : 15,
					left : 20,
					top : 5,
					backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
				});
				var klotz3 = Ti.UI.createView({
					width : 15,
					height : 15,
					left : 5,
					top : 20,
					backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
				});
				var klotz4 = Ti.UI.createView({
					width : 15,
					height : 15,
					left : 20,
					top : 20,
					backgroundColor : colors[Math.ceil((colors.length - 1) * Math.random())]
				});

				if(item.img) {
					var img = Ti.UI.createImageView({
						image : item.img[0],
						width : 50,
						height : 50,
						top : 5,
						left : 5
					});
					row.add(img);
				} else {
					row.add(klotz1);
					row.add(klotz2);
					row.add(klotz3);
					row.add(klotz4);
				}
				if(item.title.length > 1)
					rows.push(row);
			}
			tv.setData(rows);

		});
		
		w.add(tv);
		w.title = 'News aus der Praxis';
		return w;
	};
	return api;
}());
