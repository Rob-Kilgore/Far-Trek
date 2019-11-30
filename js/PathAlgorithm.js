function getAdjacent(graph, node) {
     var adjacent = [];
     graph.edges.forEach((edge, i) => {
          // If either end is this node
          if(edge.a === node.uuid) {
               if(!node.path.includes("," + edge.b + ",")) {
                    var n = {uuid: edge.b, path:edge.b, h:0};
                    adjacent.push(n);
               }
          }
          else if (edge.b === node.uuid) {
               if(!node.path.includes("," + edge.a + ",")) {
                    var n = {uuid: edge.a, path:edge.a, h:0};
                    adjacent.push(n);
               }
          }
     });
     return adjacent;
}

function getHeuristic(graph, weight, totalSlope, currId, nextId)
{
     var curr = graph.nodes.find(function(el) { return el.uuid === currId });
     var next = graph.nodes.find(function(el) { return el.uuid === nextId });
     var across = Math.sqrt(Math.pow((curr.lat - next.lat), 2) + Math.pow((curr.lon - next.lon), 2));
     var ele = Math.abs(((next.ele - curr.ele) / across) - totalSlope);
     // Weigh elevation change by actual distance between 2 points so that a small really steep section does not increase heuristic un-proportionately
     var totalDistance = Math.sqrt(Math.pow(across, 2) + Math.pow(next.ele - curr.ele, 2));
     ele = ele * totalDistance;
     return ((1- weight) * across) + (weight * ele);
}

module.exports = {
     getPath: function(graph, start, end, weight) {
          var startNode = graph.nodes.find(function(el) { return el.uuid == start });
          var endNode = graph.nodes.find(function(el) { return el.uuid == end });
          if(startNode == undefined)
          {
               throw "Start node does not exist";
          }
          if(endNode == undefined)
          {
               throw "End node does not exist";
          }
          var distance = Math.sqrt(Math.pow((startNode.lat - endNode.lat), 2) + Math.pow((startNode.lon - endNode.lon), 2));
          var totalSlope = (endNode.ele - startNode.ele) / distance;
          var firstNode = {uuid: start, path: "," + start, h:0};
          var open = [firstNode];
          var closed = [];
          
          while(open.length > 0) {
               var current;
               var small = -1;
               var index = -1;
               open.forEach((node, i) => {
                    if(node.h < small || small == -1) {
                         small = node.h;
                         index = i;
                    }
               });
               current = open.splice(index, 1)[0];
               if(current.uuid === end)
               {
                    return current;
               }
               var neighbors = getAdjacent(graph, current);
               for(var i = 0; i < neighbors.length; i++)
               {
                    var neighbor = neighbors[i];
                    neighbor.path = current.path + "," + neighbor.path;
                    neighbor.h = current.h + getHeuristic(graph, weight, totalSlope, current.uuid, neighbor.uuid);

                    // if open list contains this node with lower h
                    if(open.find(function(el) { return el.uuid === neighbor.uuid && el.h <= neighbor.h}))
                    {
                         // skip this element
                         continue;
                    }
                    // if closed list contains this node with lower h
                    if(closed.find(function(el) { return el === neighbor.uuid && el.h <= neighbor.h }))
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