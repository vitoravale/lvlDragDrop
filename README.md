# Native AngularJs drag and drop directive
An easy to use, native, directive to enable drag/drop in your angular app.  This directive has no dependency on
jQuery or other frameworks, it does require a browser that supports the HTML5 drag/drop events.

[Live Demo](http://logicbomb.github.io/ng-directives/drag-drop.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)

## UUID Service
A very simple service for working with [UUIDs](http://en.wikipedia.org/wiki/Universally_unique_identifier).

[Live Demo](http://logicbomb.github.io/ng-directives/uuid.html)

[Documentation](http://jasonturim.wordpress.com/2013/09/01/angularjs-drag-and-drop/)

## Changes in this fork
The [original repo](https://github.com/logicbomb/lvlDragDrop) doesn't seem to get updates, so I've added my changes
and fixes to my own fork.

* Clean up code (indentation, semicolons)
* Fixed bower.json to include the required lvl-uuid.js as well
* Added the ability to disable drag and drop: `<div lvl-draggable="{{ authentication.isAdmin() }}"></div>`
* Fixed AngularJS 1.3 compatibility by returning id's instead of elements
* Fixed a big memory leak
* Add a `lvl-dragging` class to the element while it's being dragged

### Install this fork
`bower install https://github.com/kevinrenskers/lvlDragDrop.git --save`
