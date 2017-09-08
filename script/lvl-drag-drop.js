angular.module('lvl.directives.dragdrop', ['lvl.services', 'lvl.constants']);

angular.module('lvl.directives.dragdrop').directive('lvlDraggable', ['$rootScope', 'uuid', 'CONSTANTS', function ($rootScope, uuid, CONSTANTS) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      var attrListenner = scope.$watch(function () {
        return attrs.lvlDraggable;
      }, function (newValue, oldValue) {
        if (newValue === 'true')
          initialize();
        else if (newValue === 'false')
          clear();
      });

      if (attrs.lvlDraggable === 'false') {
        return;
      }

      function initialize() {
        angular.element(el).attr('draggable', 'true');

        var id = angular.element(el).attr('id');
        if (!id) {
          id = uuid.new();
          angular.element(el).attr('id', id);
        }

        el.bind(CONSTANTS.DRAG_START, function (e) {
          e.dataTransfer.setData('text', id);

          if (e.stopPropagation) {
            e.stopPropagation();
          }

          el.addClass('lvl-dragging');
          $rootScope.$emit(CONSTANTS.LVL_DRAG_START);
        });

        el.bind(CONSTANTS.DRAG_END, function () {
          el.removeClass('lvl-dragging');
          $rootScope.$emit(CONSTANTS.LVL_DRAG_END);
        });

        el.bind('dragover', function (e) {
          if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
          }

          e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
          return false;
        });
      }

      function clear(){
        el.unbind(CONSTANTS.DRAG_START);
        el.unbind(CONSTANTS.DRAG_END);
      }

      scope.$on('$destroy', function () {
        attrListenner();
        clear();
      });

    }
  };
}]);

angular.module('lvl.directives.dragdrop').directive('lvlDropTarget', ['$rootScope', 'uuid', 'CONSTANTS', function ($rootScope, uuid, CONSTANTS) {
  return {
    restrict: 'A',
    scope: {
      onDrop: '&'
    },
    link: function (scope, el, attrs) {
      if (attrs.lvlDropTarget === 'false') {
        return;
      }

      var id = angular.element(el).attr('id');
      if (!id) {
        id = uuid.new();
        angular.element(el).attr('id', id);
      }

      el.bind(CONSTANTS.DRAG_OVER, function (e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }

        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
      });

      el.bind(CONSTANTS.DRAG_ENTER, function (e) {
        // this / e.target is the current hover target.
        angular.element(e.target).addClass('lvl-over');
      });

      el.bind(CONSTANTS.DRAG_LEAVE, function (e) {
        angular.element(e.target).removeClass('lvl-over');  // this / e.target is previous target element.
      });

      el.bind(CONSTANTS.DROP, function (e) {
        if (e.preventDefault) {
          e.preventDefault(); // Necessary. Allows us to drop.
        }

        if (e.stopPropagation) {
          e.stopPropagation(); // Necessary. Allows us to drop.
        }

        var data = e.dataTransfer.getData('text');
        scope.onDrop({ dragEl: data, dropEl: id, event: e });
      });

      var dragStartListener = $rootScope.$on(CONSTANTS.LVL_DRAG_START, function () {
        var el = document.getElementById(id);
        angular.element(el).addClass('lvl-target');
      });

      var dragEndListener = $rootScope.$on(CONSTANTS.LVL_DRAG_END, function () {
        var el = document.getElementById(id);
        angular.element(el).removeClass('lvl-target');
        angular.element(el).removeClass('lvl-over');
      });

      scope.$on('$destroy', function () {
        dragStartListener();
        dragEndListener();
        el.unbind(CONSTANTS.DRAG_OVER);
        el.unbind(CONSTANTS.DRAG_ENTER);
        el.unbind(CONSTANTS.DRAG_LEAVE);
        el.unbind(CONSTANTS.DROP);
      });
    }
  };
}]);
