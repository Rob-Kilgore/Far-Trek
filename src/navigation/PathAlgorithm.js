function getAdjacent(node) {
	var adjacent = [];
	for (var i = 0; i < node.obj.neighbors.length; i++) {
		var neighbor = node.obj.neighbors[i];
		var n = { obj: neighbor, path: node.path.slice(0), h: 0, f: 0 };
		n.path.push({ uuid: neighbor.uuid, lat: neighbor.lat, lon: neighbor.lon, ele: neighbor.ele });
		adjacent.push(n);
	}
	return adjacent;
}

function getHeuristic(weight, curr, next) {
	//console.log(curr);
	var across = Math.sqrt(Math.pow(curr.obj.lat - next.obj.lat, 2) + Math.pow(curr.obj.lon - next.obj.lon, 2));
	var eleChange = Math.abs(next.obj.ele - curr.obj.ele);
	var ele = eleChange * eleChange / across;

	// Weigh elevation change by actual distance between 2 points so that a small really steep section does not increase heuristic un-proportionately
	return (1 - weight) * across + weight * ele;
}

function getDistanceToGoal(curr, goal, weight) {
	var across = Math.sqrt(Math.pow(curr.lat - goal.lat, 2) + Math.pow(curr.lon - goal.lon, 2));
	var eleChange = Math.abs(curr.ele - goal.ele);
	var ele = eleChange * eleChange / across;
	if (across == 0) {
		ele = 0;
	}
	// so that edges without elevation change are not free when only weighing elevation
	if (eleChange == 0) {
		ele = 1;
	}
	return (1 - weight) * across + weight * ele;
}

function findNode(graph, coords) {
	// passes in the graph, and coords in the format of (lat, long)
	var _nearestNode = graph[0];
	// hueristic here is take the sum of the (absolute difference between target lat and current node lat) and
	//        (absolute difference between the target long and current node long)
	// Goal is to minimize this value
	var _hueristic = abs(_nearestNode.obj.lat - coords[0]) + abs(_nearestNode.obj.long - coords[1]);
	for (var i = 0; i < graph.length; i++) {
		// get heuristic of current node of iterator
		var currentHueristic = abs(graph[i].obj.lat - coords[0]) + abs(graph[i].obj.long - coords[1]);
		// compare hueristics and update node closest to the long and lat target
		if (currentHueristic <= _hueristic) {
			_nearestNode = graph[i];
			_hueristic = currentHueristic;
		}
	}
	return _nearestNode;
}

module.exports = {
	getPath: function(graph, start, end, weight) {
		var startNode = findNode(graph, start);
		var endNode = findNode(graph, end);
		if (startNode == undefined) {
			throw 'Start node does not exist';
		}
		if (endNode == undefined) {
			throw 'End node does not exist';
		}
		var firstNode = {
			obj: startNode,
			path: [ { uuid: start, lat: startNode.lat, lon: startNode.lon, ele: startNode.ele } ],
			h: 0,
			f: 0
		};
		var open = [ firstNode ];
		var closed = [];

		while (open.length > 0) {
			var current;
			var small = -1;
			var index = -1;
			open.forEach((node, i) => {
				if (node.f < small || small == -1) {
					small = node.f;
					index = i;
				}
			});
			current = open.splice(index, 1)[0];
			//console.log("visiting " + current.path + " with f " + current.f);
			if (current.obj.uuid === end) {
				return current;
			}
			var neighbors = getAdjacent(current);
			for (var i = 0; i < neighbors.length; i++) {
				var neighbor = neighbors[i];
				neighbor.h = current.h + getHeuristic(weight, current, neighbor);
				neighbor.f = neighbor.h + getDistanceToGoal(neighbor.obj, endNode, weight);
				// if open list contains this node with lower h
				if (
					open.find(function(el) {
						return el.obj.uuid === neighbor.obj.uuid && el.h <= neighbor.h;
					})
				) {
					// skip this element
					continue;
				}
				// if closed list contains this node with lower h
				if (
					closed.find(function(el) {
						return el.obj.uuid === neighbor.obj.uuid && el.h <= neighbor.h;
					})
				) {
					// skip this element
					continue;
				}
				open.push(neighbor);
			}
			closed.push(current);
		}
		throw 'End is not reachable from start';
	}
};
