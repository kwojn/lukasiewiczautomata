function automata() {

	this.isTerminalState = function(state) {
		if (logic.symbols.nonTerminal.indexOf(state) === -1)
			return true;
		return false;
	}
	
	this.walkTree = function(node, feedObj) {
		
		for (x in node.children) {
			this.walkTree(node.children[x],feedObj);
		}
		this.updateStatus(node,feedObj);
		customEventHandler.trigger("onNodeUpdated",node);
	}

	this.updateStatus = function(node, feedObj) {
		if (node.isRoot && this.isTerminalState(node.state)){
			feedObj.updateMatrix();
		}
		
		// for first run we have no previous state so we assume that it was thesame as current
		if (node.previousState === null) {
			node.previousState = node.state;
		}
		//to make it easier lets take transition rule object from logic
		var transitionRule = logic.stateTransition[node.state];
		// if no transition rule than I'm logic state or variable
		
		if (typeof transitionRule === "undefined") {
			// if I'm variable
			if (logic.symbols.logicState.indexOf(node.state) === -1) {
				node.previousState = node.state;
				node.state = feedObj.getValue(node.state);
				node.iteration++;
				return;
			//if I'm logic state	
			} else {
				var newState = node.previousState;
				node.previousState = node.state;
				node.state = newState;
				
				return;
			}
		}
		var childLeft = node.children[0].state;
		var childRight = node.children[1].state;
		var transitionPattern = childLeft + childRight;
		var newState = transitionRule[transitionPattern];
		if (typeof newState !== "undefined") {
			// push current state as previous
			node.previousState = node.state;
			//update status
			node.state = transitionRule[transitionPattern];
		}
	}
}