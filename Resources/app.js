var colors = ['#E1007E', '#C50041', '#EBEE00', '#8ACBD5', '#EFA23E', '#5F0A7B', '#DFEFF0', '#E497BA', '#33519D', '#33519D'];

Ti.include('date.js');

Ti.include('data/massnahmen.js');

Titanium.UI.setBackgroundColor('#33519D');

var ui = {};
var ctrl = {};

Ti.include('ctrl.infothek.js');

Ti.include('ui.cms.js');
Ti.include('ui.infothek.js');
Ti.include('ui.scheduler.js');

Ti.include('ctrl.zyklusmonitor.js');
Ti.include('ui.zyklusmonitor.js');

var starterView = Ti.UI.createImageView({
	image : Ti.Filesystem.resourcesDirectory + 'assets/Default.png',
	width : '100%',
	height : '100%'
});
var drpfeiffer = Ti.UI.createImageView({
	image : Ti.Filesystem.resourcesDirectory + 'assets/rpfeiffer.jpg',
	width : 320,
	height : 'auto',
	opacity : 0.1
});
drpfeiffer.animate(Ti.UI.createAnimation({
	opacity : 1,
	duration : 2500
}));

var starterWin = Ti.UI.createWindow({
	width : '100%',
	height : '100%'
});
starterWin.add(starterView);
starterWin.add(drpfeiffer);

starterWin.open();
var transe = {
	transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT,
	duration : 2000,
	delay : 3000
};
starterWin.close(transe);

var tabGroup = Titanium.UI.createTabGroup();

var tab1 = Titanium.UI.createTab({
	icon : 'assets/i.png',
	title : 'Infothek',
	window : ui.infothek.createWindow()
});

var tab2 = Titanium.UI.createTab({
	icon : 'assets/notepad.png',
	title : 'News',
	window : ui.cms.createNews()

});

var tab3 = Titanium.UI.createTab({
	icon : 'assets/checkmark.png',
	title : 'Kalender',
	window : ui.skalender.createWindow()
});

setTimeout(function() {
	var win4 = Ti.UI.createWindow({
		barColor : '#333',
		backgroundColor : '#33519D'
	});

	win4.add(ui.calendar.getCalendar(win4));

	var tab4 = Titanium.UI.createTab({
		icon : 'assets/line-chart.png',
		title : 'Zyklusmonitor',
		window : win4
	});
	tabGroup.addTab(tab4);

}, 10);
var win5 = Ti.UI.createWindow({
	barColor : '#333',
	backgroundColor : '#33519D',
	title : "Telefonliste"
});

var phoneliste = [{
	"label" : 'Dr. Rüdiger Pfeiffer',
	"nr" : '73166060'
}, {

	"label" : 'Ärztlicher Notdienst',
	"nr" : '7311400140'
}, {
	"label" : 'Hebammen-Notdienst',
	"nr" : '1716841300'
}, {
	"label" : 'Uni Frauenklinik',
	"nr" : '73150058630'
}, {
	"label" : 'Uni Kinderklinik',
	"nr" : '73150027761'
}, {
	"label" : 'Donauklinik Neu-Ulm',
	"nr" : '731804246'
}, {
	"label" : 'KKH Blaubeuren',
	"nr" : '7344170147'
}, {
	"label" : 'Krankentransport Taxi',
	"nr" : '73166066'
}, {
	"label" : 'Giftnotruf',
	"nr" : '89414022'
}, {
	"label" : 'KKH Langenau',
	"nr" : '7345891222'
}, {
	"label" : 'KKH Laupheim',
	"nr" : '7392707256'
}, {
	"label" : 'KKH Illertissen',
	"nr" : '7303177130'
}, {
	"label" : 'KKH Ehingen',
	"nr" : '7391586365'
}];
var rows = [];
for (var i = 0; i < phoneliste.length; i++) {
	var row = Ti.UI.createTableViewRow({
		hasChild : true,
		nr : phoneliste[i].nr,
		title : phoneliste[i].label
	});
	rows.push(row);
}
var tv = Ti.UI.createTableView({
	height : '100%',
	data : rows
});

tv.addEventListener('click', function(e) {
	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['Verstanden', 'Abbruch'],
		message : 'Möchten Sie jetzt tatsächlich „' + e.rowData.title+ '“ anrufen?',
		title : 'Frage'
	});
	dialog.show();
	dialog.addEventListener('click', function(_e) {
		if (_e.index == 0) {
			var nr = 'tel:0049' + e.rowData.nr;
			Ti.Platform.openURL(nr);
		}
	});
});

win5.add(tv);
var tab5 = Titanium.UI.createTab({
	icon : 'assets/phone.png',
	title : 'Telefonlsite',
	window : win5
});

tabGroup.addTab(tab1);
tabGroup.addTab(tab5);

tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.open();
