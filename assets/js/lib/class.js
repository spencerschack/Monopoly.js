/**
 * Returns a class with all but the last arguments merged into the last argument
 * as super classes. Methods present in the child and the parent have wrapSuper
 * called on them.
 * 
 * Usage:
 * -----------------------------------------------------------------------------
    var Animal = Class({
     
        type: "Mammal", // Instance variable.
   
        speak: function() { // Instance method.
	    	return "I am a ";
        }        

    }).mixin({

     	count: 0, // Class variable.

     	find: function() { // Class method.
       		// ...
     	}

    });
    var Dog = Class(Animal, {

	    _name: "Dog", // Private instance variable (by convention).

    	speak: function() {
    		return this.super() + "dog";
    	},

    	get name() {
    		return this._name;
    	},

    	set name(value) {
    		this._name = value;
    		return this.name;
    	}
    });
 * 
 * @param {...Object} [parents] - Super classes.
 * @param {Object} obj - The attribute and methods definitions.
 */
var Class = function() {

	var args    = [].slice.call(arguments)
	  , obj     = args[args.length - 1] || {}
	  , parents = args.slice(0, -1)
	  , constructor;

	if(!obj.initialize) {
		if(parents.length) {
			obj.initialize = function() {
				this.super.apply(this, arguments);
			}
		} else {
			obj.initialize = function() {};
		}
	}
	constructor = function() {
		this.initialize.apply(this, arguments);
	}

	constructor.prototype = obj;
	parents.forEach(function(parent) {
		constructor.mixin(parent);
		constructor.prototype.mixin(parent.prototype);
	});

	return constructor;

}