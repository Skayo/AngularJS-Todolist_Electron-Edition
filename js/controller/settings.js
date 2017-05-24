app.controller('SettingsController', function ($scope,  $rootScope, $location) {
    // Base.js variable
    var base = $scope.$parent;

    // Shortcut to use $location inside HTML
    $scope.location = $location;

    // Show var
    $scope.showReload = false; // True if the user changed the language

    // Languages
    $scope.languages = [{ short: 'en', full: 'English' }, { short: 'de', full: 'Deutsch' }]; //   <<<    Add new languages here!
    
    // Called when the 'Save' button is clicked
    $scope.saveSettings = function () {
        base.saveStorage(); // Save storage

        $location.path('#!/list/0'); // Redirect to the first list
    };
});