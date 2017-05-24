const fs = require('fs');
const path = require('path');

app.controller('BaseController', function($scope, lang, storageProvider, $route){
    // Shortcuts
    $scope.settings = storageProvider.storage.settings;
    $scope.lists = storageProvider.storage.lists;

    // Load languages
    $scope.lang = lang.load($scope.settings.language);
    if($scope.lang){
        console.log('Loaded language ' + $scope.settings.language);
    } else {
        console.error('Cannot load language ' + $scope.settings.language);
    }

    // Simplyfied save storage (for easier use in app)
    $scope.saveStorage = function(){
        storageProvider.save(storageProvider.storage);
    };
});