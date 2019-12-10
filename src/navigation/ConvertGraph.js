
module.exports = {

    convertGraph: function(graphJSON) {
        var graph = [];
        for(var i = 0; i < graphJSON.nodes.length; i++) {
            graph.push(graphJSON.nodes[i]);
            graph[i].neighbors = [];
        }
        for(var i = 0; i < graphJSON.edges.length; i++) {
            var a = graph.find(function(el) { return el.uuid === graphJSON.edges[i].a });
            var b = graph.find(function(el) { return el.uuid === graphJSON.edges[i].b });
            if(a && b){
				if(!a.neighbors.includes(b)) {
					a.neighbors.push(b);
				}
				if(!b.neighbors.includes(a)) {
					b.neighbors.push(a);
				}
			}
        }
        return graph;
    }
};