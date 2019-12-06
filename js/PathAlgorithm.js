function getAdjacent(node) {
     var adjacent = [];
     for(var i = 0; i < node.obj.neighbors.length; i++) {
          var n = {obj: node.obj.neighbors[i], path:node.path.slice(0), h:0, f:0};
          n.path.push(node.obj.neighbors[i].uuid);
          adjacent.push(n);
     }
     /*graph.edges.forEach((edge, i) => {
          // If either end is this node
          if(edge.a === node.uuid) {
               if(!node.path.includes(edge.b)) {
                    var n = {uuid: edge.b, path:node.path.slice(0), h:0};
                    n.path.push(edge.b);
                    adjacent.push(n);
               }
          }
          else if (edge.b === node.uuid) {
               if(!node.path.includes(edge.a)) {
                    var n = {uuid: edge.a, path:node.path.slice(0), h:0};
                    n.path.push(edge.a);
                    adjacent.push(n);
               }
          }
     });*/
     return adjacent;
}

function getHeuristic(graph, weight, curr, next)
{
     //var curr = graph.nodes.find(function(el) { return el.uuid === currId });
     //var next = graph.nodes.find(function(el) { return el.uuid === nextId });
     var across = Math.sqrt(Math.pow((curr.obj.lat - next.obj.lat), 2) + Math.pow((curr.obj.lon - next.obj.lon), 2));
     var eleChange = Math.abs(next.obj.ele - curr.obj.ele);
     var ele = ((eleChange * eleChange) / across);
     
     // Weigh elevation change by actual distance between 2 points so that a small really steep section does not increase heuristic un-proportionately
     return ((1- weight) * across) + (weight * ele);
}

function getDistanceToGoal(curr, goal, weight) {
     var across = Math.sqrt(Math.pow((curr.lat - goal.lat), 2) + Math.pow((curr.lon - goal.lon), 2));
     var eleChange = Math.abs(curr.ele - goal.ele);
     var ele = ((eleChange * eleChange) / across);
     if(across == 0)
     {
          ele = 0;
     }
     return ((1- weight) * across) + (weight * ele);
}

module.exports = {
     getPath: function(graph, start, end, weight) {
          var startNode = graph.find(function(el) { return el.uuid == start });
          var endNode = graph.find(function(el) { return el.uuid == end });
          if(startNode == undefined)
          {
               throw "Start node does not exist";
          }
          if(endNode == undefined)
          {
               throw "End node does not exist";
          }
          var firstNode = {obj: startNode, path: [start], h:0, f:0};
          var open = [firstNode];
          var closed = [];
          
          while(open.length > 0) {
               var current;
               var small = -1;
               var index = -1;
               open.forEach((node, i) => {
                    if(node.f < small || small == -1) {
                         small = node.f;
                         index = i;
                    }
               });
               current = open.splice(index, 1)[0];
               //console.log("visiting " + current.path + " with f " + current.f);
               if(current.obj.uuid === end)
               {
                    return current;
               }
               var neighbors = getAdjacent(current);
               for(var i = 0; i < neighbors.length; i++)
               {
                    var neighbor = neighbors[i];
                    neighbor.h = current.h + getHeuristic(graph, weight, current, neighbor);
                    neighbor.f = neighbor.h + getDistanceToGoal(neighbor.obj, endNode, weight);
                    // if open list contains this node with lower h
                    if(open.find(function(el) { return el.obj.uuid === neighbor.obj.uuid && el.h <= neighbor.h}))
                    {
                         // skip this element
                         continue;
                    }
                    // if closed list contains this node with lower h
                    if(closed.find(function(el) { return el.obj.uuid === neighbor.obj.uuid && el.h <= neighbor.h }))
                    {
                         // skip this element
                         continue;
                    }
                    open.push(neighbor);
               }
               closed.push(current);
          }
          throw "End is not reachable from start"
     }
}