var xpath = require('xpath')
var dom = require('xmldom').DOMParser
var request = require('request')
// var tidy = require('htmltidy').tidy
var tidy = require('htmltidy').tidy;
var util = require('util')
var url = 'https://itunes.apple.com/us/app/sonic-dash/id582654048?mt=8'

request(url, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var doc = new dom().parseFromString(body);
		var title = xpath.select('//div[@id="title"]/div/h1/text()', doc)[0];
        var developer = xpath.select('//div[@id="title"]/div/h2/text()', doc)[0];
        var description = xpath.select('//div[@class="product-review"]/p/text()', doc)[0];
        var logo = xpath.select('//div[@class="lockup product application"]/a/div/img/@src', doc)[0].nodeValue;
        var price = xpath.select('//div[@class="price"]/text()', doc)[0];
        var genre = xpath.select('//div[@class="lockup product application"]/ul//li[@class="genre"]/a/text()', doc)[0];
        var releasedate = xpath.select('//div[@class="lockup product application"]/ul//li[@class="release-date"]/text()', doc)[0];
        var requirements = xpath.select('//div[@class="lockup product application"]/p/text()', doc)[0];
        var language = xpath.select('//div[@class="lockup product application"]/ul//li[@class="language"]/text()', doc)[0];
        var copyright = xpath.select('//div[@class="lockup product application"]/ul//li[@class="copyright"]/text()', doc)[0];
        var apprating = xpath.select('//div[@class="app-rating"]/a/text()', doc)[0];
        var ratings = xpath.select('//div[@class="extra-list customer-ratings"]/div[@class="rating"]/@aria-label', doc);
        var current = ratings[0].nodeValue;
        var overall = ratings[1].nodeValue;       
        var currentversion = current.split(',')[1];
        var currentversionstar = current.split(',')[0];
        var allversions = overall.split(',')[1];
        var allversionsstar = overall.split(',')[0];
        
        var iphonescreenshots = new Array();
        xpath.select('//div[@metrics-loc="iPhone"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
        	iphonescreenshots.push(node.nodeValue);
        });

        var ipadscreenshots = new Array();
        xpath.select('//div[@metrics-loc="iPad"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
        	ipadscreenshots.push(node.nodeValue);
        });

        console.log('title: ' + title);
        console.log('developer: ' + developer);
        console.log('description: ' + description);
        console.log('logo: ' + logo);
        console.log('price: ' + price);
        console.log('genre: ' + genre);
        console.log('releasedate: ' + releasedate);
        console.log('requirements: ' + requirements);
        console.log('language: ' + language);
        console.log('copyright: ' + copyright);
        console.log('apprating: ' + apprating);
        console.log('currentversion: ' + currentversion);
        console.log('currentversionstar: ' + currentversionstar);
        console.log('allversions: ' + allversions);
        console.log('allversionsstar: ' + allversionsstar);

        console.log('iPhone screenshots:');
        iphonescreenshots.forEach(function (scr) {
        	console.log(scr);
        });

        console.log('iPad screenshots:');
        ipadscreenshots.forEach(function (scr) {
        	console.log(scr);
        });
	};
})

