var xpath = require('xpath')
    ,dom = require('xmldom').DOMParser
    ,request = require('request');
    // var tidy = require('htmltidy').tidy
    //,tidy = require('htmltidy').tidy

var parse = function (body, callback) {
    var doc = new dom().parseFromString(body);
    var data = {};
    data.title = xpath.select('//div[@id="title"]/div/h1/text()', doc)[0].nodeValue;
    data.developer = xpath.select('//div[@id="title"]/div/h2/text()', doc)[0].nodeValue;
    data.description = xpath.select('//div[@class="product-review"]/p/text()', doc)[0].nodeValue;
    data.logo = xpath.select('//div[@class="lockup product application"]/a/div/img/@src', doc)[0].nodeValue;
    data.price = xpath.select('//div[@class="price"]/text()', doc)[0].nodeValue;
    data.genre = xpath.select('//div[@class="lockup product application"]/ul//li[@class="genre"]/a/text()', doc)[0].nodeValue;
    data.releasedate = xpath.select('//div[@class="lockup product application"]/ul//li[@class="release-date"]/text()', doc)[0].nodeValue;
    data.requirements = xpath.select('//div[@class="lockup product application"]/p/text()', doc)[0].nodeValue;
    data.language = xpath.select('//div[@class="lockup product application"]/ul//li[@class="language"]/text()', doc)[0].nodeValue;
    data.copyright = xpath.select('//div[@class="lockup product application"]/ul//li[@class="copyright"]/text()', doc)[0].nodeValue;
    data.apprating = xpath.select('//div[@class="app-rating"]/a/text()', doc)[0].nodeValue;
    var ratings = xpath.select('//div[@class="extra-list customer-ratings"]/div[@class="rating"]/@aria-label', doc);
    var current = ratings[0].nodeValue;
    var overall = ratings[1].nodeValue;
    data.currentversion = current.split(',')[1].trim();
    data.currentversionstar = current.split(',')[0];
    data.allversions = overall.split(',')[1].trim();
    data.allversionsstar = overall.split(',')[0];

    data.iphonescreenshots = [];
    xpath.select('//div[@metrics-loc="iPhone"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
        data.iphonescreenshots.push(node.nodeValue);
    });

    data.ipadscreenshots = [];
    xpath.select('//div[@metrics-loc="iPad"]//div[@class="lockup"]/img/@src', doc).forEach(function (node) {
        data.ipadscreenshots.push(node.nodeValue);
    });
    callback(null, data);
};

var load = function (url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parse ( body, function (err, data) {
            if (err) throw err;
            for (var prop in data) {
                console.log(data[prop]);
            }
            });
        }
    });
};

var loadWithCallBack = function (url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parse (body, function (err, data) {
            if (err) throw err;
            callback(data);
            });
        }
    });
};

exports.parse = parse;
exports.load = load;
exports.loadWithCallBack = loadWithCallBack;