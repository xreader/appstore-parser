var xpath = require('xpath')
	,dom = require('xmldom').DOMParser
	,request = require('request')
	// var tidy = require('htmltidy').tidy
	//,tidy = require('htmltidy').tidy
	,util = require('util')
	, url = 'https://itunes.apple.com/us/app/sonic-dash/id582654048?mt=8';

var parse = function (body, callback) {
	var doc = new dom().parseFromString(body);
	var data = {};
	data.title = xpath.select('//div[@id="title"]/div/h1/text()', doc)[0];
	data.developer = xpath.select('//div[@id="title"]/div/h2/text()', doc)[0];
	data.description = xpath.select('//div[@class="product-review"]/p/text()', doc)[0];
	data.logo = xpath.select('//div[@class="lockup product application"]/a/div/img/@src', doc)[0].nodeValue;
	data.price = xpath.select('//div[@class="price"]/text()', doc)[0];
	data.genre = xpath.select('//div[@class="lockup product application"]/ul//li[@class="genre"]/a/text()', doc)[0];
	data.releasedate = xpath.select('//div[@class="lockup product application"]/ul//li[@class="release-date"]/text()', doc)[0];
	data.requirements = xpath.select('//div[@class="lockup product application"]/p/text()', doc)[0];
	data.language = xpath.select('//div[@class="lockup product application"]/ul//li[@class="language"]/text()', doc)[0];
	data.copyright = xpath.select('//div[@class="lockup product application"]/ul//li[@class="copyright"]/text()', doc)[0];
	data.apprating = xpath.select('//div[@class="app-rating"]/a/text()', doc)[0];
	data.ratings = xpath.select('//div[@class="extra-list customer-ratings"]/div[@class="rating"]/@aria-label', doc);
	data.current = data.ratings[0].nodeValue;
	data.overall = data.ratings[1].nodeValue;       
	data.currentversion = data.current.split(',')[1];
	data.currentversionstar = data.current.split(',')[0];
	data.allversions = data.overall.split(',')[1];
	data.allversionsstar = data.overall.split(',')[0];
	
	data.iphonescreenshots = new Array();
	xpath.select('//div[@metrics-loc="iPhone"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
		data.iphonescreenshots.push(node.nodeValue);
	});

	data.ipadscreenshots = new Array();
	xpath.select('//div[@metrics-loc="iPad"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
		data.ipadscreenshots.push(node.nodeValue);
	});
	callback(null, data);
};

exports.parse = parse;

var load = function (url) {
	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			parse ( body, function (err, data) {
				if (err) throw err;
				//console.log(":::" + JSON.stringify(data));
				console.log(data.title);
			});
		};
	})
};
exports.load = load;
load(url);