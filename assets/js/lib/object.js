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