app.factory('lang', function ($http) {
    var lang = {};

    lang.load = function (language) {
        var loadedlang = {};
        var langfile = 'languages/' + language + '.json';
        return JSON.parse(fs.readFileSync(langfile, 'UTF-8'));
    };

    return lang;
});