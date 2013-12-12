Object.defineProperty(String.prototype, "dasherize", { value: function() {
	return this.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
}});