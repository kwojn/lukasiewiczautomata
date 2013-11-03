function controller(){
	this.inputData = "";
	this.rootNode = {};
	this.stopCondition = false;
	var self = this;
	this.iterator = 0;
	this.stopOnFalse = false;
	
	
	
	this.__init = function(){
		self.parser = new parser();
		self.feedProvider = {};
		self.automata = new automata();
		
	}
	
	this.loadInputData = function(id,e){
			
		var inputString = document.getElementById(id).value;
		self.parser.loadInput(inputString);
		self.feedProvider = new feedProvider(self.parser.variableArray);
		this.rootNode = self.parser.buildTree();
		//$("#output").append("<p>"+this.parser.getStringRepresentation(this.rootNode)+"  inputFeed: initialState</p>");
		
		self.processTree();
		
		
	}
	
	this.processTree = function(){
		customEventHandler.addListener("onIterationLimitReached",function(obj){
			self.stopCondition=true;
		});
		while(!this.stopCondition){
			self.automata.walkTree(self.rootNode,self.feedProvider);
			
			customEventHandler.trigger("onIterationEnd",this);
			
		};
		
	}
	self.__init();
	
	
}

(function(global){
	
	$("form").on("submit",function(e){
		e.preventDefault();
	});
	
	
	global.controller = new controller();
	
	global.customEventHandler = new eventHandler();
	
	global.customEventHandler.addListener("onIterationEnd", function(obj){
		if (obj.rootNode.state==="F" && document.forms[0].breakOnFalse.checked===true){
			 return obj.stopCondition=true;
		}
		var feed=obj.feedProvider.currentMatrix;
		if (feed.length===0){
			feed=" initial state";
		}
		$("#output").append("<p>"+obj.parser.getStringRepresentation(obj.rootNode)+"  inputFeed: "+feed+"</p>");
		
		
		
	});
	
	
	
	
})(this)