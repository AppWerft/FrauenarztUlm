ctrl.zyklusmonitor = ( function() {
		var api = {};
		var conn = Ti.Database.open('menstruationen4');
		conn.execute('CREATE TABLE IF NOT EXISTS horen (id INTEGER PRIMARY KEY, ctime INT, mtime INT, yymm INT, day INT, blut INT, marks TEXT)');
		api.setData = function(data) {
			var zeit = new Date();
			var mtime = Math.ceil(zeit.getTime() / 1000);
			var sql = 'REPLACE INTO horen (yymm, day, ctime, mtime, blut) VALUES (' + data.yymm + ', ' + data.dd + ', ' + mtime + ', ' + mtime + ', ' + data.value + ')';
			conn.execute(sql);
		};
		api.getDatas = function(yymm, _callback) {
			var sql = 'SELECT day,blut FROM horen WHERE yymm=' + yymm + ' ORDER BY mtime DESC';
			var resultSet = conn.execute(sql);
			var list = [];
			while(resultSet.isValidRow()) {
				var res = {};
				res.cellid = '' + yymm + resultSet.fieldByName('day');
				res.val = resultSet.fieldByName('blut');
				list.push(res);
				resultSet.next();
			}
			resultSet.close();
			_callback(list);
		};
		return api;
	}());
