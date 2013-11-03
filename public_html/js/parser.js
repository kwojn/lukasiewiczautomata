function parser() {

	this.stringTable = [];
	this.variableArray = [];
	var self = this;
	/**
	 *  Checks if node is terminal - returns true if so
	 * @param {Object} node
	 * @returns {Boolean}
	 */
	this.isTerminal = function(node) {
		if (logic.symbols.nonTerminal.indexOf(node.state) === -1)
			return true;
		return false;
	}
	
	
	this.isVariable  = function(node){
		
		if (logic.symbols.nonTerminal.indexOf(node.state)===-1 && logic.symbols.logicState.indexOf(node.state)===-1)
			return true;
		return false;
	}
	
	/**
	 * Builds list of nodes based on given string
	 * @param {type} stringTable
	 * @returns {Array}
	 */
	this.buildNodeList = function() {
		var table = new Array();
		for (var x in this.stringTable) {
			table[x] = new node(this.stringTable[x], x);
			if (this.isVariable(table[x]) && this.variableArray.indexOf(table[x].state)==-1){
				this.variableArray.push(table[x].state);
			}
		}
		return table;
	}
	/**
	 * Walks and builds tree basing on given string table
	
	 * @returns {undefined}
	 */
	this.buildTree = function() {
		
		this.walkArray(this.table[0]);
		this.table[0].isRoot=true;
		return this.table[0];
	};
	/**
	 * Returns index of node
	 * @param {type} node
	 * @returns {@exp;self@pro;table@call;indexOf}
	 */
	this.getNodeIndex = function(node) {
		return self.table.indexOf(node);
	}

	/**
	 * Walks through an table and builds tree - reduces array to tree structure of nodes
	 * @param {type} node
	 * @returns {Boolean}
	 */
	this.walkArray = function(node) {
		
		if(typeof node==="undefined"){
			return true;
		}
		if (!this.isTerminal(node)) {
			if (node.children.length<2){
				var child = this.table[this.getNodeIndex(node)-1];
				node.children.push(child);
				this.table.splice(this.getNodeIndex(child),1);
				this.walkArray(node);
			}
		}
		this.walkArray(this.table[this.getNodeIndex(node)+1]);	
	};
	/**
	 * Drwas tree 
	 * @param {type} node
	 * @param {type} intend
	 * @returns {undefined}
	 */
	this.drawArray = function(node,intend){
		if (typeof intend==="undefined"){
			intend= 0;
		}
		
		for (var i=0;i<intend;i++ ){
			document.write("-");	
		}
		document.write(node.state+"<br/>");
		for(var x in node.children){
			this.drawArray(node.children[x],1+intend);
		}
	}
	
	this.getStringRepresentation = function(node,retStr){
		if(typeof retStr ==="undefined" ){
			retStr="";
		}
		retStr= " "+node.state+retStr;
		
		for(var x in node.children){
			retStr=this.getStringRepresentation(node.children[x])+retStr;
		}
		return retStr;
		
		
	}
	
	
	this.loadInput = function(dataString){
		dataString.replace("/^\s+|\s+$/g","");
		this.stringTable = dataString.split(" ");
		this.table = self.buildNodeList(this.stringTable);
	}
	

}

