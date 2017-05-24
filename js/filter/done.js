app.filter('doneFilter', function () {
    return function (state, langOpen, langDone) { // langOpen and langDone are used for translation
        if (state === true) {
            return langOpen;
        } else {
            return langDone;
        }
    };
});