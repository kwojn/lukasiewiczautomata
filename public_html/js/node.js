function node(state, index) {

	this.isRoot=false;
	this.previousState = null;
	this.state = state;
	this.children = [];
	this.iteration=0;
}