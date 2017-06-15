angular.module('methodPrompterApp', [])
.constant('_', window._)
.controller('mainCtrl', function (combinationService) {
  let mainCtrl = this;

  mainCtrl.$onInit = function() {
    mainCtrl.newMethod = '';
    mainCtrl.stage = 0;

    mainCtrl.stages = {
      'Doubles': 5,
      'Minor': 6,
      'Triples': 7,
      'Major': 8,
    };
  };

  // Always one fewer place bells than number of bells ringing the method
  mainCtrl.addMethod = function() {
    combinationService.addNewMethod(mainCtrl.newMethod, mainCtrl.stage - 1)
  };

  mainCtrl.getMethods = function() {
    return combinationService.getMethods();
  }

})
.service('combinationService', function() {

  let methods = [];

  // We assume that 1 is not a place bell that anyone wants to learn at the moment
  function addNewMethod(method, numPlaceBells)
  {
    methods.push({
      name: method,
      numPlaceBells
    });
  }

  function getMethods() {
    return methods;
  }

  function getAllPossibilities() {

  }

  return {
    addNewMethod,
    getMethods
  }

});
