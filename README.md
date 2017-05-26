# AngularJS-TodoList
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/85db5afb8f0d4ae7a0a16bb1a17759aa)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Skayo/AngularJS-TodoList&amp;utm_campaign=Badge_Grade)

A simple TodoList built with AngularJS

This is my first AngularJS App!

Web Edition: https://github.com/Skayo/AngularJS-TodoList

# Installation
To install this electron app type:
```
$ npm install
$ electron ./main.js
```

# Screenshot
[![TodoList.png](https://s21.postimg.org/flau7kxef/Todo_List.png)]()

# Todo
- Nothing

# Adding languages
- First look into the ``languages/en.json`` and ``languages/de.json`` and copy one of them
- Rename the copied file to ``(short-name).json`` where (short-name) is the short name of you language
- Then translate everything
- If you are finished go into the ``js/controller/settings.js`` and add your language (like the other two) to the ``$scope.languages``-Array
  - The short name must be equally to the file name
  - The full name is for the settings on the website
