var parser = require('./appstore-parser');
// parser.load('https://itunes.apple.com/us/app/sonic-dash/id582654048?mt=8');

parser.loadWithCallBack('https://itunes.apple.com/us/app/sonic-dash/id582654048?mt=8', function (data) {
    for (var prop in data) {
        console.log(data[prop]);
    }
});