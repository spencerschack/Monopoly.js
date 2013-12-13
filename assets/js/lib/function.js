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

Object.defineProperty(Function.prototype, "once", { value: function() {
	var func   = this
	  , called = false;
	return function() {
		if(!called) {
			called = true;
			return func.apply(this, arguments);
		}
	}
}});

Object.defineProperty(Function.prototype, "debounce", { value: function() {
	var func = this
	  , timeout, context, args, called;
	return function() {
		if(called) return;
		context = this;
		args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			called = true;
			func.apply(context, args);
		}, 0);
	}
}});