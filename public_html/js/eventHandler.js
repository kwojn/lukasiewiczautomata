function eventHandler(){
	var self = this;
	
	this.acumulator = {
		
		"onIterationEnd":[],
		"onNodeUpdated":[],
		"onIterationLimitReached":[],
		"onFeedUpdated":[]
	}
	
	this.addListener = function(eventName,myFunction){
		self.acumulator[eventName].push(myFunction);
	}
	
	
	this.trigger = function(eventName,obj){
		for(var x in self.acumulator[eventName]){
			self.acumulator[eventName][x](obj);
		}
	}
	
	
		
	
	
	
}


