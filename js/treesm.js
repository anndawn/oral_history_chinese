  var treeData2=
    {"name": "移情的产生机制",
     "children": [
        {"name": "条件反射式",
        "children": [
           { "name": "模仿" },
           { "name": "训练" },
         ]},
        {"name": "认知模式",
         "children": [
            { "name": "语言处理" },
            { "name": "换位思考" },
          ]}
      ]
    };
  var margin = {top: 20, right: 90, bottom: 30, left:30},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
function drawtree(divname,treedata) {
  var svg = d3.select(divname).append("svg")
              .attr("width", width + margin.right + margin.left)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(120," + margin.top + ")");
  var i = 0,duration = 750,root;
  var treemap = d3.tree().size([height, width]);
  root = d3.hierarchy(treedata, function(d) {return d.children;});
  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(collapse);
  update(root);


  function collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  }

  function update(source) {
    var treedata = treemap(root);
    var nodes = treedata.descendants(),
        links = treedata.descendants().slice(1);
    nodes.forEach(function(d){ d.y = d.depth * 180});

    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {
          console.log(d,i);
          return d.id || (d.id =++i); });

    var nodeEnter = node.enter().append('g')
                        .attr('class', 'node')
                        .attr("transform", function(d) {
                          return "translate(" + source.y0 + "," + source.x0 + ")";
                      })
                        .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "#06ee3d" : "#eec878";
        });

    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; })
        .attr("font-size","14px");

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
       });

    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", function(d) {
          return d._children ? "rgb(144, 139, 140)" : "#f6bb5c";
      })
      .attr('cursor', 'pointer');

  console.log(source.y,source.x);
    var nodeExit = node.exit().transition()
                      .duration(duration)
                      .attr("transform", function(d) {
                          return "translate(" + source.y + "," + source.x + ")";
                      })
                      .remove();

    nodeExit.select('circle')
            .attr('r', 1e-6);

    nodeExit.select('text')
      .style('fill-opacity', 1e-6);


    var link = svg.selectAll('path.link')
                  .data(links, function(d) { return d.id; });

    var linkEnter = link.enter().insert('path', "g")
                        .attr("class", "link")
                        .attr('d', function(d){
                          var o = {x: source.x0, y: source.y0}
                          return diagonal(o, o)
                        })
                        .attr("fill","none")
                        .attr("stroke","black");

    var linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
              .duration(duration)
              .attr('d', function(d){ return diagonal(d, d.parent) });

    var linkExit = link.exit().transition()
                        .duration(duration)
                        .attr('d', function(d) {
                          var o = {x: source.x, y: source.y}
                          return diagonal(o, o)
                        })
                        .remove();
  nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path
    }

    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
      console.log(node);
      $(".node").on("click",function (e,i) {
        var ancestors=[];
        var parent=e;
        while (parent) {
                     ancestors.push(parent);
                      parent = parent.parent;}
        console.log(ancestors);
      })
    }
  }
}
