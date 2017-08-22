(function () {
  var libraryStorage = {};

  function librarySystem(libraryName, dependencyArray, callback) {
    var libraryArray = [];
    if (dependencyArray) {
	  libraryArray = dependencyArray.map(function (libName) {
	    return libraryStorage[libName];
		});
	  libraryStorage[libraryName] = callback.apply(this, libraryArray);
	} else {
	  return libraryStorage[libraryName];
	}	
  }
	
  window.librarySystem = librarySystem;
})();

tests ( {
  'It should have access to the function with one global variable.': function () {
    var functionInterface = Boolean(librarySystem);
	eq(functionInterface, true);
  },
  'It should run the callback function when given.': function(){
    var count = 0;
	librarySystem('test',[],function(){
	  count++;
	});
	eq(count,1);
  },
  'It should return the library when empty dependencyArray is given.': function(){
    librarySystem('firstName', [], function(){
	  return 'anton';
	});
	var test = librarySystem('firstName')
	eq(test, 'anton')
  },
  'It should return the library with the dependencies.': function(){
	librarySystem('pangalan', [], function(){
	  return 'anton';
	});
	librarySystem('introduction',['pangalan'], function(name){
	  return 'My name is ' + name;
	});
	var check = librarySystem('introduction');
	eq(check,'My name is anton');
  },
  'It should return or have access to all dependencies.': function(){
	librarySystem('one', [], function(){
	  return '1';
	});
	librarySystem('two', [], function(){
	  return '2';
	});
	librarySystem('three', [], function(){
	  return '3';
	});
	librarySystem('oneTwoThree',['one','two','three'],function(one,two,three){
	  return one + two + three;
	});
	var count = librarySystem('oneTwoThree');
	eq(count,'123')
  }
 } );