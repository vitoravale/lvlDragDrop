angular.module('lvl.constants', []);

angular.module('lvl.constants').factory('CONSTANTS', function(){

  return {
    DRAG_END: 'dragend',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DRAG_START: 'dragstart',
    DROP: 'drop',
    LVL_DRAG_END: 'LVL-DRAG-END',
    LVL_DRAG_START: 'LVL-DRAG-START'
  }

});