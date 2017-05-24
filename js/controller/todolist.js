app.controller('TodoListController', function($scope, $routeParams, $location){
    // Base.js variable
    var base = $scope.$parent;

    // Shortcut to use $location inside HTML
    $scope.location = $location;

    // Set current showing tab to the id passed by url
    $scope.showTab = $routeParams.id;

    // Add-Todo form model
    $scope.addTodoForm = {};

    // New List form model
    $scope.newListTitle = "";
    $scope.showNewList = false;

    // Set priority to '0' so the first option in the selection ('Select Priority...') is selected by default
    $scope.addTodoForm.priority = '0';

    // Called when clicking the checkbox next to a todo.
    $scope.checkTodo = function(listID, todoID){
        if (base.lists[listID].todos[todoID].done){ // Check if todo is done
            base.lists[listID].todos[todoID].done = false; // If it was already done, set it back to false ('open')
            console.log('Unchecked ' + listID + ',' + todoID );
        } else {
            base.lists[listID].todos[todoID].done = true; // If it was open, set it to true ('done')
            console.log('Checked ' + listID + ',' + todoID);
        }
        base.saveStorage(); // Save storage
    };

    // Called when the Add-Todo form gets submitted
    $scope.addTodo = function(){
        // Default values
        $scope.addTodoForm.done = false;
        $scope.addTodoForm.id = base.lists[$scope.showTab].todos.length;
        $scope.addTodoForm.date = Date.now();

        $scope.addTodoForm.priority = parseInt($scope.addTodoForm.priority); // Convert priority from string (from option value) to integer
        
        // If no notice was set, set notice to an empty string
        if (typeof $scope.addTodoForm.notice == 'undefined'){
            $scope.addTodoForm.notice = '';
        }

        console.log('Added todo:');
        console.log($scope.addTodoForm);

        base.lists[$scope.showTab].todos.push($scope.addTodoForm); // Push the new todo to the todo-list of the current list 

        base.saveStorage(); // Save storage

        $scope.addTodoForm = {}; // Reset form
        $scope.addTodoForm.priority = '0'; // Set priority to the first option in the selection again
    };

    // Called when the 'Remove ticked todos' button is clicked
    $scope.removeTickedTodos = function (listID) {
        // Filter out checked todos
        base.lists[listID].todos = base.lists[listID].todos.filter(function (val) {
            if (val.done) {
                console.log('Removed todo ' + listID + ',' + val.id);
                return false;
            }
            return true;
        });

        // Reindex todos
        for (var t = 0; t < base.lists[listID].todos.length; t++) {
            base.lists[listID].todos[t].id = t;
        }

        base.saveStorage(); // Save storage
    };

    // Called when the 'New list' button is clicked
    $scope.newList = function(){
        var title = $scope.newListTitle;
        if (title != "" && title != null){ // Check if title isn't empty
            var newlist = {};

            // Default values
            newlist.id = base.lists.length;
            newlist.title = title;
            newlist.todos = [];

            base.lists.push(newlist); // Push the new list to the list of lists

            base.saveStorage(); // Save storage

            console.log('Added new list: ' + newlist.title);

            $scope.showNewList = false;

            $location.path('list/' + newlist.id); // Show the new list
        }
    };

    // Called when the 'Delete list' button is clicked
    $scope.deleteList = function (listID) {
        var confirmed = confirm(base.lang.deleteconfirm); // Get confirmation if the user really wants to delete the current list. 'confirmed' is true if the user confirms

        // If the user pressed 'Cancel', abort
        if (confirmed === false){
            return;
        }

        base.lists.splice(listID, 1); // Remove list from the list of lists

        console.log('Removed list ' + listID);

        // Reindex lists
        for (var l = 0; l < base.lists.length; l++) {
            base.lists[l].id = l;
        }

        base.saveStorage(); // Save storage

        console.log(typeof base.lists[listID]);

        // If there is a tab to the right:
        if(typeof base.lists[listID] != 'undefined'){
            // Go to the tab to the right
            $location.path('list/'+listID);
            console.log("Right");
            return;
        }

        // If there is a tab to the left:
        if(typeof base.lists[listID-1] != 'undefined'){
            // Go to tab to the left
            $location.path('/list/'+(listID-1));
            console.log("Left");
            return;
        }

        // If there is no tab left (f.e. all lists deleted)
        $location.path('list/0'); // Redirect to the first list
    };
});