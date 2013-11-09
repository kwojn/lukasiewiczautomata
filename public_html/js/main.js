function controller() {
	this.inputData = "";
	this.rootNode = {};
	this.stopCondition = false;
	var self = this;
	this.iterator = 0;
	this.stopOnFalse = false;
	this.stopOnValue = document.forms[0].stopOn.value;

	this.updateOnStop  = function(htmlObject){
		this.onStopValue = htmlObject.value;
	}

	this.__init = function() {
		
		self.iterator = 0;
		self.parser = new parser();
		self.feedProvider = {};
		self.automata = new automata();
		$("#output").html("");
		
	}

	this.loadInputData = function(id, e) {
		self.__init();
		var inputString = document.getElementById(id).value;
		self.parser.loadInput(inputString);
		self.feedProvider = new feedProvider(self.parser.variableArray);
		this.rootNode = self.parser.buildTree();
		$("#output").append("<p>" + this.parser.getStringRepresentation(this.rootNode) + "  inputFeed: initialState</p>");
		self.processTree();
	}

	this.processTree = function() {
		customEventHandler.addListener("onIterationLimitReached", function(obj) {
			self.stopCondition = true;
		});
		while (!this.feedProvider.stop) {
			self.automata.walkTree(self.rootNode, self.feedProvider);
			customEventHandler.trigger("onIterationEnd", this);
		};

	}
	self.__init();


}

(function(global) {

	

	global.controller = new controller();

	global.init = function() {

		global.customEventHandler = new eventHandler();

		global.customEventHandler.addListener("onIterationLimitReached", function(obj) {
			
			obj.stop = true;
			return;
		});

		global.customEventHandler.addListener("onIterationEnd", function(obj) {
				
			if (obj.rootNode.state ==obj.onStopValue && document.forms[0].breakOnFalse.checked === true) {
				
				return obj.feedProvider.stop = true;
			}
			var feed = obj.feedProvider.currentMatrix;
			if (feed.length === 0) {
				feed = " initial state";
			}
			$("#output").append("<p>" + obj.parser.getStringRepresentation(obj.rootNode) + "  inputFeed: " + feed + "</p>");




		});




	}

	global.init();



})(this)