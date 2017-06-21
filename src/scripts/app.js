angular.module('methodPrompterApp', [])
.constant('_', window._)
.controller('mainCtrl', function (combinationService) {
  let mainCtrl = this;

  mainCtrl.$onInit = function() {
    mainCtrl.stages = {
      5: 'Doubles',
      6: 'Minor',
      7: 'Triples',
      8: 'Major'
    };

    mainCtrl.newMethod = '';
    mainCtrl.stage = "5";
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

  let methods = [
    {name: 'Cambridge', numPlaceBells: 5},
    {name: 'York', numPlaceBells: 5},
    {name: 'Bourne', numPlaceBells: 5},
    {name: 'Beverley', numPlaceBells: 5},
    {name: 'Surfleet', numPlaceBells: 5},
    {name: 'London', numPlaceBells: 5},
    {name: 'Norwich', numPlaceBells: 5}
  ];

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
