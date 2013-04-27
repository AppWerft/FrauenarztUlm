var ctrl = {};


ctrl.cachedImageView = function(imageDirectoryName, url, imageViewObject, hires) {
	var filename = url.split('/');
	var hiresfilename;
	filename = filename[filename.length - 1];
	hiresfilename = filename.split('.');
	hiresfilename = hiresfilename[hiresfilename.length - 2] + '@2x' + hiresfilename[hiresfilename.length - 1];
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
	var hiresfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, hiresfilename);
	if (file.exists()) {
		imageViewObject.image = file.nativePath;
	} else {
		var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
		if (!g.exists()) {
			g.createDirectory();
		};
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function() {
			if (xhr.status == 200) {
				file.write(xhr.responseData);
				if (hires ||imageViewObject.hires) {
					hiresfile.write(xhr.responseData);
					imageViewObject.hires = true;
				}	
				imageViewObject.image = file.nativePath;
			};
		};
		xhr.open('GET', url);
		xhr.send();
	};
};


ctrl.getInfothek = function(_callback) {
	var datafile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'infothek.json');
	var xhr = Ti.Network.createHTTPClient({
		timeout : 5000
	});
	xhr.onload = function() {
		try {
			var json = JSON.parse(this.responseText);
			datafile.write(this.responseText);
			_callback(json,true);
		} catch(E) {
			Ti.API.log(E);
		};
	};
	xhr.onerror = function() {
		if(datafile.exists()) {
			_callback(JSON.parse(datafile.read()),false);
		}
	};
	xhr.open('GET', 'http://tools.webmasterei.com/gynulm/infothek.json');
	xhr.send();
};

ctrl.getNews = function(_callback) {
	var datafile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'news.json');
	var xhr = Ti.Network.createHTTPClient({
		timeout : 5000
	});
	xhr.onload = function() {
		try {
			var json = JSON.parse(this.responseText);
			datafile.write(this.responseText);
			_callback(json,true);
		} catch(E) {
			Ti.API.log(E);
		};
	};
	xhr.onerror = function() {
		if(datafile.exists()) {
			_callback(JSON.parse(datafile.read()),false);
		}
	};
	xhr.open('GET', 'http://tools.webmasterei.com/gynulm/news.json');
	xhr.send();
};

