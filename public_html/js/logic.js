(function(global) {


	global.logic = {
		stateTransition: {
			//implication
			"I": {
				"FF": "T",
				"FU": "T",
				"FT": "T",
				"UF": "U",
				"UU": "U",
				"UT": "T",
				"TF": "F",
				"TU": "U",
				"TT": "T",
				
				

				
				
				
				
			},
			//negation
			"!": {
				"NF": "T",
				"NU": "U",
				"NT": "F",
				"TN": "F",
				"UN": "U",
				"FN": "T",
				
				

				
				
				
			},
			//alternative
			"A": {
				"FF": "F",
				"FU": "U",
				"FT": "T",
				"UF": "U",
				"UU": "U",
				"UT": "T",
				"TF": "T",
				"TU": "T",
				"TT": "T",
				

			},
			//conjunction
			"C": {
				"FF": "F",
				"FU": "F",
				"FT": "F",
				"UF": "F",
				"UU": "U",
				"UT": "U",
				"TF": "F",
				"TU": "U",
				"TT": "T",
				
				

				
			},
			
		},
		symbols: {
			nonTerminal: ["I", "IL", "A", "AL", "!", "E", "C"],
			logicState: ["T", "U", "F","N"]
		}
		
		






	}






})(this)

