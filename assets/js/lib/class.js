/**
 * Returns a Function that, when called, changes the value of super on its
 * context, calls the receiver of wrapSuper, and reverts the value of super on
 * its context.
 * @param {Object} sup - The Object to be defined as this.super.
 */
Object.defineProperty(Function.prototype, "wrapSuper", { value: function(sup) {
	var func = this;
	if(typeof sup != "function") {
		sup = function(sup) { return function() { return sup } }(sup);
	}
	return function() {
		var oldSuper = this.super
		  , returnValue;
		this.super = sup;
		try {
			returnValue = func.apply(this, arguments);
		} finally {
			this.super = oldSuper;
		}
		return returnValue;
	}
}});

/**
 * Similar to extend except it applies Function.wrapSuper whenever the receiver
 * and obj have a Function as key.
 * @param {Object} obj - The object to include.
 */
Object.defineProperty(Object.prototype, "mixin", { value: function(obj) {
	if(!obj) debugger;
	Object.keys(obj).forEach(function(key) {
		var child  = Object.getOwnPropertyDescriptor(this, key)
		  , parent = Object.getOwnPropertyDescriptor(obj, key);
		if(child) {
			if(child.get && (parent.get || parent.hasOwnProperty("value"))) {
				child.get = child.get.wrapSuper(parent.get || parent.value);
			}
			if(child.set && parent.set) {
				child.set = child.set.wrapSuper(parent.set);
			}
			if(child.hasOwnProperty("value") && child.value.wrapSuper
				&& parent.hasOwnProperty("value")) {
				child.value = child.value.wrapSuper(parent.value);
			}
			Object.defineProperty(this, key, child);
		} else {
			Object.defineProperty(this, key, parent);
		}
	}, this);
	return this;
}});

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