app.factory('storageProvider', function () {
    var storageProvider = {};

    // Default storage wich is set on the first page load
    storageProvider.defaultStorage = {
        settings: {
            title: 'TodoListr',
            language: 'en',
            dateformat: 'HH:mm dd.MM.yyyy',
            timezone: '+0000'
        },
        lists: [
            {
                id: 0,
                title: 'Default',
                todos: [
                    {
                        id: 0,
                        name: 'Enjoy!',
                        priority: 2,
                        notice: 'Thanks for using!',
                        done: false,
                        date: 1494939867372
                    }
                ]
            }
        ]
    };

    // The loaded storage
    storageProvider.storage = {};

    if (!fs.existsSync('storage.json')) { // If file does not exist (First app start)
        storageProvider.defaultStorage.lists[0].todos[0].date = Date.now(); // Set date of default todo as now

        // Save storage to file
        fs.writeFile('storage.json', JSON.stringify(storageProvider.defaultStorage), (err) => { 
            if (err) {
                console.error(err);
            } else {
                console.log('Created new storage');
            }
        });
        
        storageProvider.storage = storageProvider.defaultStorage; // Set the loaded storage to the default storage
    } else { // If file exists and the user has a saved storage
        storageProvider.storage = JSON.parse(fs.readFileSync('storage.json', 'UTF-8')); // Load the saved storage
    }

    console.log('Loaded storage');

    // Save function to save to the localstorage
    storageProvider.save = function (newstorage) {
        // Save storage to file
        fs.writeFile('storage.json', JSON.stringify(newstorage), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Saved storage');
            }
        });

        storageProvider.storage = newstorage; // Set the loaded storage to the new storage
    };

    return storageProvider;
});