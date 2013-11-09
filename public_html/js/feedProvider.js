function feedProvider(variableArray){
	var self = this;
	this.iterator = 0;
	this.currentMatrix = "";
	this.prevMatrix="";
	this.variableArray = variableArray;
	this.maxValue = 0;
	this.stop = false;
	
	
	this.__init = function(){
		this.maxValue = Math.pow(3,this.variableArray.length);
		this.getIterationMatrix(0);
		this.stop = false;
		
	}
	
	this.getValue = function(variable){
		
		return this.currentMatrix[this.variableArray.indexOf(variable)];
	}
	
	this.updateMatrix = function(){
		
		this.prevMatrix=this.currentMatrix;
		
		if (this.iterator>=this.maxValue){
			return customEventHandler.trigger("onIterationLimitReached",this);
		}
		this.iterator++;
		this.getIterationMatrix(this.iterator);
		customEventHandler.trigger("onFeedUpdated",this);
	}
	
	
	this.getIterationMatrix = function(index){
		var ternarial = Number(index).toString(3);
		var preRet = ternarial;
		for(var k=ternarial.length;k<this.variableArray.length;k++){
			preRet="0"+preRet;
		}
		
		var ret="";
		for (var i in preRet){
			ret+=logic.symbols.logicState[parseInt(preRet[i])];
		}
		this.currentMatrix = ret;
		return ret;
		
		
	}
	
	this.__init();
	
	
	
}


