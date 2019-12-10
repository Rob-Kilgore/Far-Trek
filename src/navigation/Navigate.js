const pathAlgorithm = require('./PathAlgorithm.js');
const convertGraph = require('./ConvertGraph.js');

module.exports = {
	getPath: function(graphJSON, startPosition, endPosition, weight){
		
		let parsePosition = function(positionString){
			positionString = positionString.replace("[", "");
			positionString = positionString.replace("]", "");
			positionString = positionString.replace(" ", "");
			let inputs = positionString.split(",");
			inputs[0] = parseFloat(inputs[0]);
			inputs[1] = parseFloat(inputs[1]);
			return {lat:inputs[0], lon:inputs[1]};

		};
				

		startPosition = parsePosition(startPosition);
		endPosition = parsePosition(endPosition);
		weight = parseFloat(weight);
		
		console.log(startPosition, endPosition, weight);

		var node = pathAlgorithm.getPath(graphJSON, startPosition, endPosition, 0);
		console.log("path is ");
		for(let i = 0; i < node.path.length; i++){
			 console.log(node.path[i]);
		}
		console.log("with f " + node.h);

		return node.path;
		
		//temp, call the PathAlgorithm instead
		let path = [
			{uuid:111, lat:42.373558, lon:-72.542037, ele:0},
			{uuid:112, lat:42.384198, lon:-72.540679, ele:0},
			{uuid:113, lat:42.384659, lon:-72.532627, ele:0},
			{uuid:114, lat:42.384664, lon:-72.528656, ele:0},
			{uuid:115, lat:42.381339, lon:-72.527832, ele:0},
		
		];
		
		return path;
	}
}